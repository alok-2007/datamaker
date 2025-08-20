export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        let path = url.pathname.toLowerCase();

        if (path === '/') {
            path = "index.html";
        } else {
            path = path.slice(1);
        }

        if (path === "api/current-pincode") {
            const { searchParams } = url;
            const lat = searchParams.get("lat");
            const lng = searchParams.get("lng");

            if (!lat || !lng) {
                return new Response(JSON.stringify({error: "Missing lat/lng" }), {
                    status: 400,
                    headers: {"content-type": "application/json"},
                })
            }

            try {
                const geoRes = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${env.GOOGLE_MAPS_API_KEY}`);
                const data = await geoRes.json();

                if (data.status === "OK") {
                    const results = data.results;
                    let pincode = "Not found";
                    let locality = "Not found";
                    let address = "Not found";
                    let state = "Not found";
                    let country = "Not found";

                    for (const result of results) {
                        address = result.formatted_address;
                        for (const comp of result.address_components) {
                            if (comp.types.includes("postal_code")) {
                                pincode = comp.long_name;
                            }
                            if (comp.types.includes("locality")) {
                                locality = comp.long_name;
                            }
                            if (comp.types.includes("administrative_area_level_1")) {
                                state = comp.long_name;
                            }
                            if (comp.types.includes("country")) {
                                country = comp.long_name;
                            }
                        }
                        if (pincode !== "Not found") break;
                    }
                    return new Response(JSON.stringify({pincode, locality, address, state, country}),{
                        headers: {"Content-Type": "application/json"},
                    });
                } else {
                    return new Response(JSON.stringify({error: data.status}), {
                        status: 500,
                        headers: {"Content-Type": "application/json"},
                    });
                }
            } catch (err) {
                return new Response(JSON.stringify({ error: "Failed to fetch geocode", details: err.message }),{
                    status: 500,
                    headers: {"Content-Type": "application/json"},
                })
            }
        }

        try {
            let object = await env.BUCKET.get(path);
            let maintance = false
            if (!object) {
                object = await env.BUCKET.get("503");
                maintance = true;
            }

            let contentType = "application/octet-stream";

            const ext = path.split(".").pop();
            if (ext && MIME_TYPES[ext]) {
                contentType = MIME_TYPES[ext];
            } else {
                contentType = "text/html"
            }


            return new Response(object.body, {
                status: maintance ? 503 : 200,
                headers: {
                    "content-type": contentType,
                    "cache-control": maintance ? "no-store" : "public, max-age=31536000",
                    ...(maintance && { "Retry-After": "604800"})
                },
              });
        } catch (err) {
            return new Response("Internal Error", {status: 500});
        }

        
    },
};

const MIME_TYPES = {
    "html": "text/html",
    "xml": "application/xml",
    "css": "text/css",
    "js": "application/javascript",
    "json": "application/json",
    "png": "image/png",
    "jpg": "image/jpeg",
    "jpeg": "image/jpeg",
    "gif": "image/gif",
    "svg": "image/svg+xml",
    "ico": "image/x-icon",
    "webp": "image/webp",
    "woff": "font/woff",
    "woff2": "font/woff2",
    "ttf": "font/ttf",
    "otf": "font/otf",
    "txt": "text/plain",
};














////////////////


CREATE TABLE IF NOT EXISTS post (
    key TEXT PRIMARY KEY,
    name TEXT,
    type TEXT,
    district TEXT,
    state TEXT,
    pincode TEXT,
    delivery TEXT,
    division TEXT,
    region TEXT,
    circle TEXT,
    postOfficeOfPincode TEXT
);
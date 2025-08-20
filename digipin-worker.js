/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */


export default {
  async fetch(request, env, ctx) {
    const userAgent = request.headers.get('user-agent') || '';
    const isMobi = /mobile|android|mobi|iphone|ipad/i.test(userAgent);

    const url = new URL(request.url);
    let path = url.pathname.toLowerCase();

    if (isMobi && path === "/") {
        path = "mobi-homepage";
    } else if (!isMobi && path === "/") {
        path = "desk-homepage";
    } else {
        path = path.slice(1);
    }

    if (path === "api/getdigipin") {
        const { searchParams } = url;
        const lat = parseFloat(searchParams.get("lat"));
        const lon = parseFloat(searchParams.get("lng"));

        if (!lat || !lon) {
            return new Response(JSON.stringify({error: "Missing lat/lon"}), {
                status: 400,
                headers: {"content-type": "application/json"}
            })
        }

        const DIGIPIN_GRID  = [
            ['F','C','9','8'],
            ['J','3','2','7'],
            ['K','4','5','6'],
            ['L','M','P','T']
        ];

        const BOUNDS = {
            minLat: 2.5,
            maxLat: 38.5,
            minLon: 63.5,
            maxLon: 99.5
        };

        if (lat < BOUNDS.minLat || lat > BOUNDS.maxLat) return new Response(JSON.stringify({error: "Latitude out of range"}),{status: 400, headers: {"content-type":"application/json"}})
        if (lon < BOUNDS.minLon || lon > BOUNDS.maxLon) return new Response(JSON.stringify({error: "Longitude out of range"}),{status: 400, headers: {"content-type":"application/json"}})

        let minLat = BOUNDS.minLat;
        let maxLat = BOUNDS.maxLat;
        let minLon = BOUNDS.minLon;
        let maxLon = BOUNDS.maxLon;

        let digiPin = "";

        for (let level = 1; level <= 10; level++) {
            const latDiv = (maxLat - minLat) / 4;
            const lonDiv = (maxLon - minLon) / 4;

            let row = 0;
            while (!(lat >= minLat && lat <= minLat + latDiv)) {
                minLat = minLat + latDiv;
                row++;
            }

            let col = 0;
            while (!(lon >= minLon && lon <= minLon + lonDiv)) {
                minLon = minLon + lonDiv;
                col++;
            }

            digiPin += DIGIPIN_GRID[row][col]

            if (level === 3 || level === 6) digiPin += "-";

            maxLat = minLat + latDiv;
            maxLon = minLon + lonDiv;
        }

        return new Response(JSON.stringify({
            digipin: digiPin,
        }),{
            status: 200,
            headers: {"content-type": "application/json"}
        });
    }

    try {
        let object = await env.kv.get(path, {type: "text"});

        if (!object) {
            return new Response("Not Found", {status: 404})
        }

        let contentType = "application/octet-stream";

        const ext = path.split(".").pop();
        if (ext && MIME_TYPES[ext]) {
            contentType = MIME_TYPES[ext];
        } else {
            contentType = "text/html";
        }
        
        return new Response(object.body, {
            status: 200,
            headers: {"content-type": contentType}
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
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
    const userAgent = request.headers.get("user-agent") || "";
    const isMobi = /mobile|android|mobi|iphone|ipad/i.test(userAgent);

    const url = new URL(request.url);
    let path = url.pathname.toLowerCase();

    if (path === "/") {
        path = "index.html";
    } else {
        path = path.slice(1);
    }

    let count = 0;
    for (let i = 0; i < path.length; i++) {
        if (path[i] === "/") count++;
    }

    if (count === 2) {
        try {
            const stmt = env.d1.prepare(`SELECT * from post WHERE key = ${path}`);
            const result = await stmt.bind(key).first();

            if (!result) {
                return new Response("Not Found", { status: 404});
            }

            const { key, name, district, state, pincode, type, delivery, division, region, circle, postOfficeOfPincode } = result;

            const mobi_postTem = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Pin Code: ${name}, ${district}, ${state}, INDIA</title><meta name="description" content="Pincode of  ${name}, ${district}, ${state}, INDIA. Find nearby post offices, location map, and more."><meta name="keywords" content="${name} pincode, ${name}, ${district} pincode, India post office pincode"><meta name="robots" content="index, follow"><link rel="canonical" href="https://searchpincode.in/${key}"><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9248094579508417" crossorigin="anonymous"></script><style>body{font-family:system-ui,sans-serif;line-height:1.4}*{margin:0;padding:0}#logo{background-color:#860f0f;color:#fff;font-size:clamp(2rem,5vw,2.5rem);text-align:center;font-weight:700}a{color:#000;text-decoration:none}.ads{display:flex;flex-direction:column;justify-content:center;align-items:center}.ads-label{font-size:12px;color:#555;text-align:center;font-style:italic}.ads-wrap{background-color:bisque;width:320px;height:100px}main{margin:1.5%}h1{font-size:clamp(1.5rem,5vw,2rem);background-color:#cfe0f0;color:#111;padding:.3%;border-bottom:2px solid #000}h2{font-size:clamp(1.3rem,1vw,1.5rem);background-color:#d9e4ec;color:#000;margin-top:1rem;padding:.3rem;border-bottom:1px solid #000}#hero{display:inline-block;background-color:#ffe066;color:#000;font-size:35px;font-weight:900;margin:1%;padding:5px} .para{font-size:16px;text-align:justify}dt{width:auto;margin-right:auto;font-size:16px;padding-top:5px;padding-left:10px;font-weight:550}dd{width:auto;margin-left:auto;text-align:right;font-size:20px;font-weight:900;padding-right:10px;padding-bottom:5px;border-bottom:1px solid #e0e0e0}dt:nth-of-type(odd),dd:nth-of-type(odd){background-color:#c4c1c1}dt:nth-of-type(even),dd:nth-of-type(even){background-color:#f9f9f9}.backlink{display:flex;list-style:none;gap:10px;font-size:20px;flex-wrap:wrap}.backlink li:nth-of-type(odd){color:#4d1818}.backlink li:nth-of-type(even){color:#002fff}.faq-section h2{font-size:clamp(1.3rem,1vw,1.5rem);margin-bottom:.5rem}.faq h3{font-size:1rem}.faq p{margin:0 0 1rem;line-height:1}.red{color:#6348e7;font-weight:700}nav a{display:block;font-size:clamp(18px,5vw,24px);padding:.2rem;background-color:#860f0f;color:#fff;text-align:center;margin:.2rem 0}footer{background:linear-gradient(#b99f9f,#eed3d3);text-align:center;font-size:20px;padding-top:5px}footer ul{display:flex;font-size:16px;list-style:none;justify-content:center;gap:12px}</style><script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the PIN Code of ${name} Post Office?","acceptedAnswer":{"@type":"Answer","text":"The PIN Code of ${name} Post Office is ${pincode}."}},{"@type":"Question","name":"Where is the ${name} Post Office located?","acceptedAnswer":{"@type":"Answer","text":"The ${name} Post Office is located in ${district}, ${state}, under the PIN Code ${pincode}."}},{"@type":"Question","name":"How can I find the PIN Code of my current location?","acceptedAnswer":{"@type":"Answer","text":"You can visit our /my-current-location-pincode page to get the exact pincode of where you are right now."}}]}</script><script type="application/ld+json">{"@context":"https://schema.org","@type":"Place","name":"Pin Code: ${name}, ${district}, ${state}","address":{"@type":"PostalAddress","addressLocality":"${name}","addressRegion":"${state}","postalCode":"${pincode}","addressCountry":"IN"}}</script></head><body><header aria-label="Website header"><a href="/" aria-label="Homepage"><div id="logo">SearchPINcode.in</div></a></header><aside class="ads"><div class="ads-label">Advertisement</div><div class="ads-wrap"><ins class="adsbygoogle" style="display:inline-block;width:320px;height:100px" data-ad-client="ca-pub-9248094579508417" data-ad-slot="5820706228"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div></aside><main><article><h1>Pin Code: ${name}, ${district}, ${state}</h1><p class="para"><strong>${name}</strong> is a ${type} Post Office located in ${district} district of ${state}, India. The PIN Code of ${name} is <strong>${pincode}</strong>.</p><div id="hero"><a href="/${pincode}">${pincode}</a></div><dl><dt>Post Office</dt><dd><a href="/${key}">${name}</a></dd><dt>District</dt><dd><a href="/${state.toLowerCase().replace(/\s+/g,'-')}/${district.toLowerCase().replace(/\s+/g,'-')}">${district}</a></dd><dt>State</dt><dd><a href="/${state.toLowerCase().replace(/\s+/g,'-')}">${state}</a></dd><dt>Pin Code</dt><dd><a href="/${pincode}">${pincode}</a></dd><dt>Post Office Type</dt><dd>${type}</dd><dt>Delivery</dt><dd>${delivery}</dd><dt>Division</dt><dd>${division}</dd><dt>Region</dt><dd>${region}</dd><dt>Circle</dt><dd>${circle}</dd></dl></article><section aria-label="Other Post Offices with same PIN Code"><h2>Other Post Offices of PIN Code <a href="/${pincode}">${pincode}</a></h2>${postOfficeOfPincode}</section><section class="faq-section" aria-label="Frequently Asked Questions"><h2>Frequently Asked Questions</h2><div class="faq"><h3>What is the PIN Code of ${name} Post Office?</h3><p>The PIN Code of ${name} Post Office is <strong>${pincode}</strong>.</p></div><div class="faq"><h3>Where is the ${name} Post Office located?</h3><p>The ${name} Post Office is located in ${district}, ${state}, under the PIN Code ${pincode}.</p></div><div class="faq"><h3>How can I find the PIN Code of my current location?</h3><p>You can visit our <a class="red" href="/my-current-location-pincode">My Current Location Pincode</a> page to get the exact pincode of where you are right now.</p></div></section></main><nav aria-label="Main site navigation"><a href="/">Home</a><a href="/my-current-location-pincode">My Current Location Pincode</a><a href="/pincode-to-postoffice-details">Search By Pincode</a></nav><footer aria-label="Website footer"><ul><li><a href="/about">About</a></li><li><a href="/privacy-policy">Privacy</a></li><li><a href="/contact">Contact</a></li></ul><p>&copy; 2025 SearchPincode.in</p></footer></body></html>`

            return new Response(mobi_postTem,{
                status: 200,
                headers: { "Content-Type": "text/html; charset=UTF-8"}
            })
        } catch (err) {
            return new Response("Not Found", { status: 404});
        }
    }
    return new Response('Hello World!');
  },
};
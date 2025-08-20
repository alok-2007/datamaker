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
    let path = url.pathname.toLowerCase().replace(/^\/+|\/+$/g, "");

    if (path === "") {
        const homepage = `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Find Pincode of Any Location in India | Villages, Post Offices & Areas</title>
          <meta name="description" content="Easily find the pincode of any village, locality, post office, or area in India. Get accurate postal codes by name or use your current GPS location." />
          <meta name="keywords" content="pincode finder, postal code, current location pincode, Indian postal code " />
          <link rel="icon" type="image/png" href="data:image/png;base64,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" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://searchpincode.in" />
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9248094579508417" crossorigin="anonymous"></script>
          <style>
            body {
              font-family: system-ui, sans-serif;
              line-height: 1.4;
            }
            * {
              margin: 0;
              padding: 0;
            }
            #logo {
              background-color: #860f0f;
              color: #fff;
              font-size: clamp(2rem, 5vw, 2.5rem);
              text-align: center;
              font-weight: 700;
            }
            a {
              color: #000;
              text-decoration: none;
            }
            .ads {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
            .ads-label {
              font-size: 12px;
              color: #555;
              text-align: center;
              font-style: italic;
            }
            .ads-wrap {
              background-color: bisque;
              width: 320px;
              height: 100px;
            }
            main {
              margin: 1.5%;
            }
            #current-location{
              display: flex;
              justify-content: space-between;
              background: linear-gradient(#4999b9, rgb(152, 187, 99));
              padding: 8px;
              border-radius: 15px;
              margin-top: 0.5rem;
              margin-bottom: 0.4rem;
            }
            #current-location h2 {
              font-size: 18px;
              max-width: 70%;
            }
            #current-btn{
              background: hsl(58, 100%, 63%);
              font-size: 17px;
              border-radius: 8px;
              padding: 2px;
              color: rgb(85, 11, 11);
              font-weight: bold;
              border: none;
              cursor: pointer;
              animation: pulse 1s infinite;
            }
            @keyframes pulse {
              0% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
              }
              50% {
                transform: scale(1.04);
                box-shadow: 0 0 0 10px rgba(238, 255, 7, 0.164);
              }
              100% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(255, 87, 34, 0);
              }
            }
            h1{
              text-align: left;
              font-size: 20px;
            }
            form{
              display: block;
              margin: 1rem;
            }
            input{
              display: block;
              width: 95%;
              height: 1.5rem;
              padding: 5px;
              margin-top: 4px;
              font-size: 16px;
              margin-bottom: 6px;
              box-shadow: #3e22bb;
              border-radius: 8px;
              border: 2px  solid rgb(0, 0, 0);
            }
            form button {
              font-size: 18px;
              padding: 5px;
              border-radius: 8px;
              background-color: rgb(181, 230, 83);
              font-weight: 500;
              cursor: pointer;
            }
            h2{
              font-size: 20px;
            }
            ol {
              margin-left: 30px;
            }
            ol li a {
              font-size: 16px;
              color: #3e22bb;
              font-weight: 500;
            }
            .about-card{
              margin-top: 1rem;
              margin-bottom: 1rem;
              border-left: 5px solid rgb(51, 51, 243);
              border-radius: 8px;
              padding-left: 5px;
              padding-top: 5px;
              padding-bottom: 5px;
            }
            .red {
              color: #6348e7;
              font-weight: 700;
            }
            nav a {
              display: block;
              font-size: clamp(18px, 5vw, 24px);
              padding: .2rem;
              background-color: #860f0f;
              color: #fff;
              text-align: center;
              margin: .2rem 0;
            }
            footer {
              background: linear-gradient(#b99f9f, #eed3d3);
              text-align: center;
              font-size: 20px;
              padding-top: 5px;
            }
            footer ul {
              display: flex;
              font-size: 16px;
              list-style: none;
              justify-content: center;
              gap: 12px;
            }
          </style>
          <script type="application/ld+json">
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "@id": "https://searchpincode.in",
              "name": "Find Pincode of Any Location in India | Villages, Post Offices & Areas",
              "url": "https://searchpincode.in",
              "description": "Easily find the pincode of any village, locality, post office, or area in India. Get accurate postal codes by name or use your current GPS location."
            }
          </script>
        </head>
        
        <body>
          <header aria-label="Website header">
            <a href="/" aria-label="Homepage">
              <div id="logo">SearchPINcode.in</div>
            </a>
          </header>
        
          <aside class="ads">
            <div class="ads-label">Advertisement</div>
            <div class="ads-wrap">
              
            </div>
          </aside>
        
          <main>
            <article>
              <section id="current-location" aria-label="Find pincode of your current location">
                  <h2>Get Your Current Location Pincode</h2>
                  <button id="current-btn" onclick="window.location.href='/pincode-of-my-current-location'">Show Pincode of my Location</button>
              </section>
              <h1>Find Pincode of Any Village, Locality, Post Office, or Area in India</h1>
              <form id="gcse-form" role="search" aria-label="Search Indian pincodes">
                <label for="gcs-input" class="visually-hidden">Enter place or pincode:</label>
                <input type="text" id="gcs-input" name="q" placeholder="Enter village, locality, post office or pincode" required />
                <button type="submit">Search</button>
              </form>
              <div class="gcse-searchresults-only" data-queryParameterName="q"></div>
              <section id="state-list">
                <h2>List of States and Union Territories of India</h2>
                <ol><li><a href='/andaman-and-nicobar-islands'>ANDAMAN AND NICOBAR ISLANDS</a></li><li><a href='/andhra-pradesh'>ANDHRA PRADESH</a></li><li><a href='/arunachal-pradesh'>ARUNACHAL PRADESH</a></li><li><a href='/assam'>ASSAM</a></li><li><a href='/bihar'>BIHAR</a></li><li><a href='/chandigarh'>CHANDIGARH</a></li><li><a href='/chhattisgarh'>CHHATTISGARH</a></li><li><a href='/delhi'>DELHI</a></li><li><a href='/goa'>GOA</a></li><li><a href='/gujarat'>GUJARAT</a></li><li><a href='/haryana'>HARYANA</a></li><li><a href='/himachal-pradesh'>HIMACHAL PRADESH</a></li><li><a href='/jammu-and-kashmir'>JAMMU AND KASHMIR</a></li><li><a href='/jharkhand'>JHARKHAND</a></li><li><a href='/karnataka'>KARNATAKA</a></li><li><a href='/kerala'>KERALA</a></li><li><a href='/ladakh'>LADAKH</a></li><li><a href='/lakshadweep'>LAKSHADWEEP</a></li><li><a href='/madhya-pradesh'>MADHYA PRADESH</a></li><li><a href='/maharashtra'>MAHARASHTRA</a></li><li><a href='/manipur'>MANIPUR</a></li><li><a href='/meghalaya'>MEGHALAYA</a></li><li><a href='/mizoram'>MIZORAM</a></li><li><a href='/nagaland'>NAGALAND</a></li><li><a href='/odisha'>ODISHA</a></li><li><a href='/puducherry'>PUDUCHERRY</a></li><li><a href='/punjab'>PUNJAB</a></li><li><a href='/rajasthan'>RAJASTHAN</a></li><li><a href='/sikkim'>SIKKIM</a></li><li><a href='/tamil-nadu'>TAMIL NADU</a></li><li><a href='/telangana'>TELANGANA</a></li><li><a href='/the-dadra-and-nagar-haveli-and-daman-and-diu'>THE DADRA AND NAGAR HAVELI AND DAMAN AND DIU</a></li><li><a href='/tripura'>TRIPURA</a></li><li><a href='/uttar-pradesh'>UTTAR PRADESH</a></li><li><a href='/uttarakhand'>UTTARAKHAND</a></li><li><a href='/west-bengal'>WEST BENGAL</a></li></ol>
              </section>
              <p class="about-card">
                <strong>SearchPINcode.in</strong> provides access to millions of PIN code records covering localities, cities, villages, and post offices across India. 
                You can easily find the pincode of any area, including your current location using your browser’s GPS feature. 
                Discover post office details, district and state information, and more – all in one place. 
                Visit <a class="red" href="https://searchpincode.in">SearchPINcode.in</a> to explore now.
              </p>
            </article>
          </main>
        
          <nav aria-label="Main site navigation">
            <a href="/">Home</a>
            <a href="/pincode-of-my-current-location">Pincode of My Current Location</a>
            <a href="/pincode-to-postoffice-details">Search By Pincode</a>
          </nav>
        
          <footer aria-label="Website footer">
            <ul>
              <li><a href="/about">About</a></li>
              <li><a href="/privacy-policy">Privacy</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
            <p>&copy; 2025 SearchPincode.in</p>
          </footer>
          <script>
          document.getElementById("gcse-form").addEventListener("submit", function (e) {
            e.preventDefault();
            const query = document.getElementById("gcs-input").value.trim();
            if (!query) return;
        
            if (!window.__gcse) {
              // Dynamically load the CSE script
              const s = document.createElement("script");
              s.src = "https://cse.google.com/cse.js?cx=868d609ea75f74c8f";  // use your real cx code
              s.async = true;
              document.body.appendChild(s);
        
              // Wait a moment for the script to initialize, then run the query
              s.onload = function () {
                setTimeout(() => {
                  google.search.cse.element.getElement("searchresults-only").execute(query);
                }, 500); // Slight delay to ensure it loads fully
              };
            } else {
              // CSE already loaded, perform search directly
              google.search.cse.element.getElement("searchresults-only").execute(query);
            }
          });
          </script>
        </body>
        </html>
        `
        return new Response(homepage,{
            status: 200,
            headers: { "Content-Type": "text/html; charset=UTF-8"}
        });
    }

    if (path === "pincode-of-my-current-location") {
      const pincode_of_my_current_location = await env.kv.get(path);
      if (pincode_of_my_current_location) {
        return new Response(pincode_of_my_current_location, {
          status: 200,
          headers: { "Content-Type": "text/html; charset=utf-8" }
        })
      } else {
        return new Response("Not found", { status: 404 });
      }
    }

    if (path.split("/").length === 3) {
        try {
            const stmt = env.d1.prepare("SELECT * FROM post WHERE key = ?");
            const result = await stmt.bind(path).first();

            console.log("Path:",path);
            console.log("Result:",result);

            if (!result) {
                return new Response("Not Found", { status: 404});
            }

            const { key, name, district, state, pincode, type, delivery, division, region, circle, postOfficeOfPincode } = result;

            const postTem = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Pin Code: ${name}, ${district}, ${state}, INDIA</title><meta name="description" content="Pincode of ${name}, ${district}, ${state}, INDIA. Find nearby post offices, location map, and more."/><meta name="keywords" content="${name} pincode, ${name}, ${district} pincode, India post office pincode"/><meta name="robots" content="index, follow"/><link rel="canonical" href="https://searchpincode.in/${key}"/><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9248094579508417" crossorigin="anonymous"></script><style>body{font-family:system-ui,sans-serif;line-height:1.4}*{margin:0;padding:0}#logo{background-color:#860f0f;color:#fff;font-size:clamp(2rem,5vw,2.5rem);text-align:center;font-weight:700}a{color:#000;text-decoration:none}.ads{display:flex;flex-direction:column;justify-content:center;align-items:center}.ads-label{font-size:12px;color:#555;text-align:center;font-style:italic}.ads-wrap{background-color:bisque;width:320px;height:100px}main{margin:1.5%}h1{font-size:clamp(1.2rem,5vw,1.8rem);background-color:#cfe0f0;color:#111;padding:.3%;border-bottom:2px solid #000}h2{font-size:clamp(1rem,1vw,1.4rem);background-color:#d9e4ec;color:#000;margin-top:1rem;padding:.3rem;border-bottom:1px solid #000}#hero{display:inline-block;background-color:#ffe066;color:#000;font-size:35px;font-weight:900;margin:1%;padding:5px}.para{font-size:16px;text-align:justify}dt{font-size:16px;padding:5px 0 0 10px;font-weight:550}dd{font-size:19px;font-weight:900;padding:0 10px 5px 0;text-align:right;border-bottom:1px solid #e0e0e0}dt:nth-of-type(odd),dd:nth-of-type(odd){background-color:#c4c1c1}dt:nth-of-type(even),dd:nth-of-type(even){background-color:#f9f9f9}.backlink{display:flex;list-style:none;gap:15px;font-size:18px;font-weight:500;flex-wrap:wrap}.backlink li:nth-of-type(odd) a{color:#4d1818}.backlink li:nth-of-type(even) a{color:#002fff}.faq-section h2{font-size:clamp(1.3rem,1vw,1.5rem);margin-bottom:.5rem}.faq h3{font-size:1rem}.faq p{margin:0 0 1rem;line-height:1}.red{color:#6348e7;font-weight:700}nav a{display:block;font-size:clamp(18px,5vw,24px);padding:.2rem;background-color:#860f0f;color:#fff;text-align:center;margin:.2rem 0}footer{background:linear-gradient(#b99f9f,#eed3d3);text-align:center;font-size:20px;padding-top:5px}footer ul{display:flex;font-size:16px;list-style:none;justify-content:center;gap:12px}</style><script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the PIN Code of ${name} Post Office?","acceptedAnswer":{"@type":"Answer","text":"The PIN Code of ${name} Post Office is ${pincode}."}},{"@type":"Question","name":"Where is the ${name} Post Office located?","acceptedAnswer":{"@type":"Answer","text":"The ${name} Post Office is located in ${district}, ${state}, under the PIN Code ${pincode}."}},{"@type":"Question","name":"How can I find the PIN Code of my current location?","acceptedAnswer":{"@type":"Answer","text":"You can visit our /my-current-location-pincode page to get the exact pincode of where you are right now."}}]}</script><script type="application/ld+json">{"@context":"https://schema.org","@type":"Place","name":"Pin Code: ${name}, ${district}, ${state}","address":{"@type":"PostalAddress","addressLocality":"${name}","addressRegion":"${state}","postalCode":"${pincode}","addressCountry":"IN"}}</script></head><body><header aria-label="Website header"><a href="/" aria-label="Homepage"><div id="logo">SearchPINcode.in</div></a></header><aside class="ads"><div class="ads-label">Advertisement</div><div class="ads-wrap"></div></aside><main><article><h1>Pin Code: ${name}, ${district}, ${state}</h1><p class="para"><strong>${name}</strong> is a ${type} Post Office located in ${district} district of ${state}, India. The PIN Code of ${name} is <strong>${pincode}</strong>.</p><div id="hero"><a href="/${pincode}">${pincode}</a></div><dl><dt>Post Office</dt><dd><a href="/${key}">${name}</a></dd><dt>District</dt><dd><a href="/${state.toLowerCase().replace(/\s+/g,'-')}/${district.toLowerCase().replace(/\s+/g,'-')}">${district}</a></dd><dt>State</dt><dd><a href="/${state.toLowerCase().replace(/\s+/g,'-')}">${state}</a></dd><dt>Pin Code</dt><dd><a href="/${pincode}">${pincode}</a></dd><dt>Post Office Type</dt><dd>${type}</dd><dt>Delivery</dt><dd>${delivery}</dd><dt>Division</dt><dd>${division}</dd><dt>Region</dt><dd>${region}</dd><dt>Circle</dt><dd>${circle}</dd></dl></article><section aria-label="Other Post Offices with same PIN Code"><h2>Other Post Offices of PIN Code <a href="/${pincode}">${pincode}</a></h2>${postOfficeOfPincode}</section><section class="faq-section" aria-label="Frequently Asked Questions"><h2>Frequently Asked Questions</h2><div class="faq"><h3>What is the PIN Code of ${name} Post Office?</h3><p>The PIN Code of ${name} Post Office is <strong>${pincode}</strong>.</p></div><div class="faq"><h3>Where is the ${name} Post Office located?</h3><p>The ${name} Post Office is located in ${district}, ${state}, under the PIN Code ${pincode}.</p></div><div class="faq"><h3>How can I find the PIN Code of my current location?</h3><p>You can visit our <a class="red" href="/my-current-location-pincode">My Current Location Pincode</a> page to get the exact pincode of where you are right now.</p></div></section></main><nav aria-label="Main site navigation"><a href="/">Home</a><a href="/my-current-location-pincode">My Current Location Pincode</a><a href="/pincode-to-postoffice-details">Search By Pincode</a></nav><footer aria-label="Website footer"><ul><li><a href="/about">About</a></li><li><a href="/privacy-policy">Privacy</a></li><li><a href="/contact">Contact</a></li></ul><p>&copy; 2025 SearchPincode.in</p></footer></body></html>`

            return new Response(postTem,{
                status: 200,
                headers: { "Content-Type": "text/html; charset=UTF-8"}
            })
        } catch (err) {
            return new Response("Not Found", { status: 404});
        }
    }

    if (/^\/?[0-9]{6}$/.test(path)) {
        try {
            if (path === String(791122)) {
              const offices = await env.kv.get(path);
              const num_of_post = 153;
              const district = 'UPPER SUBANSIRI';
              const state = 'ARUNACHAL PRADESH';
              const pincode = path;

              const pinTem = `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Pin Code: ${pincode}, List of Post Offices</title>
                <meta name="description" content="Pin Code: ${pincode}, List of Post Offices. Find post offices, villages, and localities of india pincode." />
                <meta name="keywords" content="${pincode}, pincode ${pincode}, pincode ${pincode} post offices, pincode ${pincode} areas" />
                <link rel="icon" type="image/png" href="data:image/png;base64,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" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://searchpincode.in/${pincode}" />
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9248094579508417" crossorigin="anonymous"></script>
              
                <style>
                  body {
                    font-family: system-ui, sans-serif;
                    line-height: 1.4;
                  }
                  * {
                    margin: 0;
                    padding: 0;
                  }
                  #logo {
                    background-color: #860f0f;
                    color: #fff;
                    font-size: clamp(2rem, 5vw, 2.5rem);
                    text-align: center;
                    font-weight: 700;
                  }
                  a {
                    color: #000;
                    text-decoration: none;
                  }
                  .ads {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                  }
                  .ads-label {
                    font-size: 12px;
                    color: #555;
                    text-align: center;
                    font-style: italic;
                  }
                  .ads-wrap {
                    background-color: bisque;
                    width: 320px;
                    height: 100px;
                  }
                  main {
                    margin: 1.5%;
                  }
                  h1 {
                    font-size: clamp(1.5rem, 5vw, 2rem);
                    background-color: #cfe0f0;
                    color: #111;
                    padding: .3%;
                    border-bottom: 2px solid #000;
                  }
                  h2 {
                    font-size: clamp(1.1rem, 1vw, 1.4rem);
                    background-color: #cce2f1;
                    color: #000;
                    margin-top: 1rem;
                    padding: .3rem;
                    border-bottom: 1px solid #000;
                  }
                  .para {
                    font-size: 16px;
                    text-align: justify;
                  }
                  .tab{
                    margin-top: 2rem;
                  }
                  table{
                    width: 100%;
                    border-collapse: collapse;
                    line-height: 1.7;
                  }
                  tr{
                    border-bottom: 1px solid black;
                  }
                  table tr:nth-child(even) {
                    background-color: #b686864f;
                  }
                  table tr:nth-child(odd) {
                    background-color: rgb(255, 254, 253);
                  }
                  th{
                    text-align: left;
                    font-weight: 600;
                    font-size: 16px;
                    width: 35%;
                    padding-left: 1rem;
              
                  }
                  td{
                    text-align: right;
                    padding-right: 1rem;
                    font-size: 18px;
                    font-weight: 700;
              
                  }
                  .faq-section h2 {
                    font-size: clamp(1.3rem, 1vw, 1.5rem);
                    margin-bottom: .5rem;
                    background-color: rgb(194, 221, 188);
                  }
                  .faq h3 {
                    font-size: 1rem;
                  }
                  .faq p {
                    margin: 0 0 1rem;
                    line-height: 1;
                  }
                  .red {
                    color: #6348e7;
                    font-weight: 700;
                  }
                  nav a {
                    display: block;
                    font-size: clamp(18px, 5vw, 24px);
                    padding: .2rem;
                    background-color: #860f0f;
                    color: #fff;
                    text-align: center;
                    margin: .2rem 0;
                  }
                  footer {
                    background: linear-gradient(#b99f9f, #eed3d3);
                    text-align: center;
                    font-size: 20px;
                    padding-top: 5px;
                  }
                  footer ul {
                    display: flex;
                    font-size: 16px;
                    list-style: none;
                    justify-content: center;
                    gap: 12px;
                  }
                </style>
              
                <script type="application/ld+json">
                  {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [
                      {
                        "@type": "Question",
                        "name": "How can I find the PIN Code of my current location?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "You can visit our Pincode of my Current Location page to get the exact pincode of where you are right now."
                        }
                      }
                    ]
                  }
                </script>
              
              </head>
              
              <body>
                <header aria-label="Website header">
                  <a href="/" aria-label="Homepage">
                    <div id="logo">SearchPINcode.in</div>
                  </a>
                </header>
              
                <aside class="ads">
                  <div class="ads-label">Advertisement</div>
                  <div class="ads-wrap">
                    
                  </div>
                </aside>
              
                <main>
                  <article>
                      <h1>Pin Code: ${pincode}, List of Post Offices</h1>
                      ${offices}
                  </article>
              
                  <section class="faq-section" aria-label="Frequently Asked Questions">
                    <h2>Frequently Asked Questions</h2>
              
                    <div class="faq">
                      <h3>How can I find the PIN Code of my current location?</h3>
                      <p>You can visit our
                        <a class="red" href="/pincode-of-my-current-location">Pincode of my Current Location</a>
                        page to get the exact pincode of where you are right now.
                      </p>
                    </div>
                  </section>
                </main>
              
                <nav aria-label="Main site navigation">
                  <a href="/">Home</a>
                  <a href="/pincode-of-my-current-location">Pincode of my Current Location</a>
                  <a href="/pincode-to-postoffice-details">Search By Pincode</a>
                </nav>
              
                <footer aria-label="Website footer">
                  <ul>
                    <li><a href="/about">About</a></li>
                    <li><a href="/privacy-policy">Privacy</a></li>
                    <li><a href="/contact">Contact</a></li>
                  </ul>
                  <p>&copy; 2025 SearchPincode.in</p>
                </footer>
              </body>
              </html>`

              return new Response(pinTem,{
                status: 200,
                headers: { "Content-Type": "text/html; charset=UTF-8"}
              })
            }
            const stmt = env.d1.prepare("SELECT * FROM pin WHERE pincode = ?");
            const result = await stmt.bind(path).first();

            console.log("Path:", path);
            console.log("Result:", result);

            if (!result) {
                console.log("path0:", path)
                return new Response("Not0 Found", {status: 404});
            }

            const { pincode, offices } = result;

            const pinTem = `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Pin Code: ${pincode}, List of Post Offices</title>
              <meta name="description" content="Pin Code: ${pincode}, List of Post Offices. Find post offices, villages, and localities of india pincode." />
              <meta name="keywords" content="${pincode}, pincode ${pincode}, pincode ${pincode} post offices, pincode ${pincode} areas" />
              <link rel="icon" type="image/png" href="data:image/png;base64,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" />
              <meta name="robots" content="index, follow" />
              <link rel="canonical" href="https://searchpincode.in/${pincode}" />
              <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9248094579508417" crossorigin="anonymous"></script>
            
              <style>
                body {
                  font-family: system-ui, sans-serif;
                  line-height: 1.4;
                }
                * {
                  margin: 0;
                  padding: 0;
                }
                #logo {
                  background-color: #860f0f;
                  color: #fff;
                  font-size: clamp(2rem, 5vw, 2.5rem);
                  text-align: center;
                  font-weight: 700;
                }
                a {
                  color: #000;
                  text-decoration: none;
                }
                .ads {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                }
                .ads-label {
                  font-size: 12px;
                  color: #555;
                  text-align: center;
                  font-style: italic;
                }
                .ads-wrap {
                  background-color: bisque;
                  width: 320px;
                  height: 100px;
                }
                main {
                  margin: 1.5%;
                }
                h1 {
                  font-size: clamp(1.5rem, 5vw, 2rem);
                  background-color: #cfe0f0;
                  color: #111;
                  padding: .3%;
                  border-bottom: 2px solid #000;
                }
                h2 {
                  font-size: clamp(1.1rem, 1vw, 1.4rem);
                  background-color: #cce2f1;
                  color: #000;
                  margin-top: 1rem;
                  padding: .3rem;
                  border-bottom: 1px solid #000;
                }
                .para {
                  font-size: 16px;
                  text-align: justify;
                }
                .tab{
                  margin-top: 2rem;
                }
                table{
                  width: 100%;
                  border-collapse: collapse;
                  line-height: 1.7;
                }
                tr{
                  border-bottom: 1px solid black;
                }
                table tr:nth-child(even) {
                  background-color: #b686864f;
                }
                table tr:nth-child(odd) {
                  background-color: rgb(255, 254, 253);
                }
                th{
                  text-align: left;
                  font-weight: 600;
                  font-size: 16px;
                  width: 35%;
                  padding-left: 1rem;
            
                }
                td{
                  text-align: right;
                  padding-right: 1rem;
                  font-size: 18px;
                  font-weight: 700;
            
                }
                .faq-section h2 {
                  font-size: clamp(1.3rem, 1vw, 1.5rem);
                  margin-bottom: .5rem;
                  background-color: rgb(194, 221, 188);
                }
                .faq h3 {
                  font-size: 1rem;
                }
                .faq p {
                  margin: 0 0 1rem;
                  line-height: 1;
                }
                .red {
                  color: #6348e7;
                  font-weight: 700;
                }
                nav a {
                  display: block;
                  font-size: clamp(18px, 5vw, 24px);
                  padding: .2rem;
                  background-color: #860f0f;
                  color: #fff;
                  text-align: center;
                  margin: .2rem 0;
                }
                footer {
                  background: linear-gradient(#b99f9f, #eed3d3);
                  text-align: center;
                  font-size: 20px;
                  padding-top: 5px;
                }
                footer ul {
                  display: flex;
                  font-size: 16px;
                  list-style: none;
                  justify-content: center;
                  gap: 12px;
                }
              </style>
            
              <script type="application/ld+json">
                {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "How can I find the PIN Code of my current location?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "You can visit our Pincode of my Current Location page to get the exact pincode of where you are right now."
                      }
                    }
                  ]
                }
              </script>
            
            </head>
            
            <body>
              <header aria-label="Website header">
                <a href="/" aria-label="Homepage">
                  <div id="logo">SearchPINcode.in</div>
                </a>
              </header>
            
              <aside class="ads">
                <div class="ads-label">Advertisement</div>
                <div class="ads-wrap">
                  
                </div>
              </aside>
            
              <main>
                <article>
                    <h1>Pin Code: ${pincode}, List of Post Offices</h1>
                    ${offices}
                </article>
            
                <section class="faq-section" aria-label="Frequently Asked Questions">
                  <h2>Frequently Asked Questions</h2>
            
                  <div class="faq">
                    <h3>How can I find the PIN Code of my current location?</h3>
                    <p>You can visit our
                      <a class="red" href="/pincode-of-my-current-location">Pincode of my Current Location</a>
                      page to get the exact pincode of where you are right now.
                    </p>
                  </div>
                </section>
              </main>
            
              <nav aria-label="Main site navigation">
                <a href="/">Home</a>
                <a href="/pincode-of-my-current-location">Pincode of my Current Location</a>
                <a href="/pincode-to-postoffice-details">Search By Pincode</a>
              </nav>
            
              <footer aria-label="Website footer">
                <ul>
                  <li><a href="/about">About</a></li>
                  <li><a href="/privacy-policy">Privacy</a></li>
                  <li><a href="/contact">Contact</a></li>
                </ul>
                <p>&copy; 2025 SearchPincode.in</p>
              </footer>
            </body>
            </html>
            `;

            return new Response(pinTem,{
                status: 200,
                headers: { "Content-Type": "text/html; charset=UTF-8"}
            })
        } catch (err) {
            console.log("path1:", path)
            return new Response("Not1 Found", { status: 404});
        }
    }

    if (path.split("/").length === 2) {
      try {
          const stmt = env.d1.prepare("SELECT * FROM dist WHERE key = ?");
          const result = await stmt.bind(path).first();

          console.log("Path:",path);
          console.log("Result:",result);

          if (!result) {
              return new Response("Not Found", { status: 404});
          }

          const { key, district, state, offices } = result;

          const distTem = `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>${district}, ${state} - List of Post Offices</title>
            <meta name="description" content="List of Post Offices - ${district}, ${state}" />
            <link rel="icon" type="image/png" href="data:image/png;base64,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" />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href="https://searchpincode.in/${key}" />
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9248094579508417" crossorigin="anonymous"></script>
            <style>
              body {
                font-family: system-ui, sans-serif;
                line-height: 1.4;
              }
              * {
                margin: 0;
                padding: 0;
              }
              #logo {
                background-color: #860f0f;
                color: #fff;
                font-size: clamp(2rem, 5vw, 2.5rem);
                text-align: center;
                font-weight: 700;
              }
              a {
                color: #000;
                text-decoration: none;
              }
              .ads {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              }
              .ads-label {
                font-size: 12px;
                color: #555;
                text-align: center;
                font-style: italic;
              }
              .ads-wrap {
                background-color: bisque;
                width: 320px;
                height: 100px;
              }
              main {
                margin: 1.5%;
              }
              h1{
                text-align: center;
              }
              ol {
                margin-left: 30px;
              }
              ol li {
                font-size: 16px;
                margin-left: 1rem;
              }
              .about-card{
                margin-top: 1rem;
                margin-bottom: 1rem;
                border-left: 5px solid rgb(51, 51, 243);
                border-radius: 8px;
                padding-left: 5px;
                padding-top: 5px;
                padding-bottom: 5px;
              }
              .red {
                color: #6348e7;
                font-weight: 700;
              }
              nav a {
                display: block;
                font-size: clamp(18px, 5vw, 24px);
                padding: .2rem;
                background-color: #860f0f;
                color: #fff;
                text-align: center;
                margin: .2rem 0;
              }
              footer {
                background: linear-gradient(#b99f9f, #eed3d3);
                text-align: center;
                font-size: 20px;
                padding-top: 5px;
              }
              footer ul {
                display: flex;
                font-size: 16px;
                list-style: none;
                justify-content: center;
                gap: 12px;
              }
            </style>
          </head>
          
          <body>
            <header aria-label="Website header">
              <a href="/" aria-label="Homepage">
                <div id="logo">SearchPINcode.in</div>
              </a>
            </header>
          
            <aside class="ads">
              <div class="ads-label">Advertisement</div>
              <div class="ads-wrap">
                
              </div>
            </aside>
          
            <main>
              <article>
                  ${offices}
              </article>
            </main>
          
            <nav aria-label="Main site navigation">
              <a href="/">Home</a>
              <a href="/pincode-of-my-current-location">Pincode of My Current Location</a>
              <a href="/pincode-to-postoffice-details">Search By Pincode</a>
            </nav>
          
            <footer aria-label="Website footer">
              <ul>
                <li><a href="/about">About</a></li>
                <li><a href="/privacy-policy">Privacy</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
              <p>&copy; 2025 SearchPincode.in</p>
            </footer>
          </body>
          </html>`;

          return new Response(distTem,{
              status: 200,
              headers: { "Content-Type": "text/html; charset=UTF-8"}
          })
      } catch (err) {
          return new Response("Not Found", { status: 404});
      }
    }

    if (stateList.has(path)) {
      try {
        const stmt = env.d1.prepare("SELECT * FROM dist WHERE key = ?");
        const result = await stmt.bind(path).first();

        console.log("Path:",path);
        console.log("Result:",result);

        if (!result) {
            return new Response("Not Found", { status: 404});
        }

        const { key, state, districts } = result;

        const stateTem = `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${state} - List of District</title>
          <meta name="description" content="List of District - ${state}" />
          <link rel="icon" type="image/png" href="data:image/png;base64,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" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://searchpincode.in/${key}" />
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9248094579508417" crossorigin="anonymous"></script>
          <style>
            body {
              font-family: system-ui, sans-serif;
              line-height: 1.4;
            }
            * {
              margin: 0;
              padding: 0;
            }
            #logo {
              background-color: #860f0f;
              color: #fff;
              font-size: clamp(2rem, 5vw, 2.5rem);
              text-align: center;
              font-weight: 700;
            }
            a {
              color: #000;
              text-decoration: none;
            }
            .ads {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
            .ads-label {
              font-size: 12px;
              color: #555;
              text-align: center;
              font-style: italic;
            }
            .ads-wrap {
              background-color: bisque;
              width: 320px;
              height: 100px;
            }
            main {
              margin: 1.5%;
            }
            h1{
              text-align: center;
            }
            ol {
              margin-left: 30px;
            }
            ol li {
              font-size: 16px;
              margin-left: 1rem;
            }
            .about-card{
              margin-top: 1rem;
              margin-bottom: 1rem;
              border-left: 5px solid rgb(51, 51, 243);
              border-radius: 8px;
              padding-left: 5px;
              padding-top: 5px;
              padding-bottom: 5px;
            }
            .red {
              color: #6348e7;
              font-weight: 700;
            }
            nav a {
              display: block;
              font-size: clamp(18px, 5vw, 24px);
              padding: .2rem;
              background-color: #860f0f;
              color: #fff;
              text-align: center;
              margin: .2rem 0;
            }
            footer {
              background: linear-gradient(#b99f9f, #eed3d3);
              text-align: center;
              font-size: 20px;
              padding-top: 5px;
            }
            footer ul {
              display: flex;
              font-size: 16px;
              list-style: none;
              justify-content: center;
              gap: 12px;
            }
          </style>
        </head>
        
        <body>
          <header aria-label="Website header">
            <a href="/" aria-label="Homepage">
              <div id="logo">SearchPINcode.in</div>
            </a>
          </header>
        
          <aside class="ads">
            <div class="ads-label">Advertisement</div>
            <div class="ads-wrap">
              
            </div>
          </aside>
        
          <main>
            <article>
                ${districts}
            </article>
          </main>
        
          <nav aria-label="Main site navigation">
            <a href="/">Home</a>
            <a href="/pincode-of-my-current-location">Pincode of My Current Location</a>
            <a href="/pincode-to-postoffice-details">Search By Pincode</a>
          </nav>
        
          <footer aria-label="Website footer">
            <ul>
              <li><a href="/about">About</a></li>
              <li><a href="/privacy-policy">Privacy</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
            <p>&copy; 2025 SearchPincode.in</p>
          </footer>
        </body>
        </html>`;

        return new Response(stateTem,{
            status: 200,
            headers: { "Content-Type": "text/html; charset=UTF-8"}
        })
    } catch (err) {
        return new Response("Not Found", { status: 404});
    }
    }

    if (path === "pincode-to-postoffice-details") {
      const pincode_to_postoffice_details = await env.kv.get(path);
      if (pincode_to_postoffice_details) {
        return new Response(pincode_to_postoffice_details, {
          status: 200,
          headers: { "Content-Type": "text/html; charset=utf-8" }
        })
      } else {
        return new Response("Not found", { status: 404 });
      }
    }

    if (otherPage.has(path)) {
      const otherPage = await env.kv.get(path);
      return new Response(otherPage, {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" }
      })
    }

    return new Response("Page Not Found", { status: 404 });
  },
};

const stateList = new Set(['andhra-pradesh', 'telangana', 'assam', 'bihar', 'jharkhand', 'chhattisgarh', 'meghalaya', 'delhi', 'gujarat', 'karnataka', 'kerala', 'haryana', 'himachal-pradesh', 'jammu-and-kashmir', 'ladakh', 'madhya-pradesh', 'the-dadra-and-nagar-haveli-and-daman-and-diu', 'odisha', 'punjab', 'chandigarh', 'rajasthan', 'manipur', 'mizoram', 'nagaland', 'tripura', 'arunachal-pradesh', 'goa', 'maharashtra', 'tamil-nadu', 'puducherry', 'uttar-pradesh', 'uttarakhand', 'west-bengal', 'lakshadweep', 'andaman-and-nicobar-islands', 'sikkim']);
const otherPage = new Set(['about', 'privacy-policy', 'contact'])
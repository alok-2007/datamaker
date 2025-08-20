import json
import os
from datetime import date
import xml.etree.ElementTree as ET

URL_PER_FILE = 48000
to_state = 1
to_name = "state_url"

os.makedirs("sitemap", exist_ok=True)

with open(f"{to_name}.json", "r") as f:
    data = json.load(f)

urls = data if isinstance(data, list) else data["urls"]

def generate_sitemap(ur):
    global to_state
    urlset = ET.Element("urlset", {
        "xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9"
    })

    for url in ur:
        url_element = ET.SubElement(urlset, "url")
        loc = ET.SubElement(url_element, "loc")
        loc.text = url
        lastmode = ET.SubElement(url_element, "lastmod")
        lastmode.text = date.today().isoformat()
        change = ET.SubElement(url_element, "changefreq")
        change.text = "monthly"
        pri = ET.SubElement(url_element, "priority")
        pri.text = str(0.8)
        print(f"done {url}")
    
    tree = ET.ElementTree(urlset)
    while(os.path.exists(f"sitemap/sitemap-{to_state}.xml")):
        to_state += 1
    file_name = os.path.join("sitemap", f"sitemap-{to_state}.xml")
    tree.write(file_name, encoding="utf-8", xml_declaration=True)
    to_state += 1

meter = 0
url_stacked = []

for i in urls:
    url_stacked.append(i)
    meter += 1
    if meter == URL_PER_FILE:
        generate_sitemap(url_stacked)
        meter = 0
        url_stacked = []

if url_stacked:
    generate_sitemap(url_stacked)

print('done 👌')
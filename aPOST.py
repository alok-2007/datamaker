import pandas as pd
import os
from jinja2 import Environment, FileSystemLoader
import json
import re

with open("postOffice1.json", 'r', encoding="utf-8") as po2:
    po = json.load(po2)

with open("pinTOpost1.json", "r", encoding="utf-8") as pp1:
    pp = json.load(pp1)

env = Environment(loader=FileSystemLoader('.'))
template = env.get_template('postTem.html')
clean_url = []

def name_clean(n):
    n = re.sub(r"\'", "-", n)
    n = re.sub(r"\"", "-", n)
    n = re.sub(r"^\s*\.\s*", "", n)
    n = re.sub(r"^\s*\-\s*", "", n)
    n = re.sub(r"\s*\.\s*$", "", n)
    n = re.sub(r"\s*\-\s*$", "", n)
    n = re.sub(r"\s*\-\s*", "-", n)
    n = re.sub(r"\s*\.\s*", ".", n)
    n = re.sub(r"\s*\.\s*(?=\w{2,}\b)", "-", n)
    n = re.sub(r"\.", "", n)
    n = re.sub(r"\-+", "-", n)
    n = re.sub(r"\s+", "-", n)
    n = re.sub(r"\/", "-", n)
    return n.lower()

def post_url_maker(s, d, o):
    s = name_clean(s)
    d = name_clean(d)
    o = name_clean(o)
    return f"{s}/{d}/{o}"

def postOfficeOfPincode_giver(pin, postName):
    posts = pp.get(str(pin))
    postOfficeOfPincode = '<div class="backlink">'
    for arr in posts:
        if (arr[3] == postName):
            continue
        postOfficeOfPincode += f"<a href='/{post_url_maker(arr[7], arr[6], arr[3])}'>{arr[3]}</a>  "
    postOfficeOfPincode += '</div>'
    return postOfficeOfPincode

os.makedirs('states', exist_ok=True)

for key, data in po.items():
    [StateName, DistrictName, PostOfficeName] = key.split("/")
    key = post_url_maker(StateName, DistrictName, PostOfficeName)

    context = {
        "slug": key,
        "OfficeName": PostOfficeName.upper().replace("-", " "),
        "OfficeType": data[4],
        "Pincode": data[3],
        "Delivery": data[5],
        "DistrictName": DistrictName.upper().replace("-", " "),
        "StateName": StateName.upper().replace("-", " "),
        "Division": data[2],
        "Region": data[1],
        "Circle": data[0],
        "Latitude": "null" if data[6] == "null" else data[6],
        "Longitude": "null" if data[7] == "null" else data[7],
        "DistrictSlug": f"{StateName}/{DistrictName}",
        "StateSlug": StateName,
        "postOfficeOfPincode": postOfficeOfPincode_giver(data[3], PostOfficeName.upper().replace("-", " ")),
        "OfficeC": PostOfficeName.title().replace("-", " "),
        "DistrictC": DistrictName.title().replace("-", " "),
        "StateC": StateName.title().replace("-", " "),
        "OfficeType_1": data[4].split(" ", 1)[0].title(),
        "Delivery_1": "Yes" if data[5] == 'DELIVERY' else "No",
    }

    html_content = template.render(**context)

    filename = f"{key}.html"
    file_path = os.path.join("states", filename)
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    try:
        with open(file_path, 'w', encoding="utf-8") as f:
            f.write(html_content)
        print(f"{key} - done")
        clean_url.append(f"https://searchpincode.in/{key}")
    except OSError as e:
        print(f"😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡 {key}")

with open("postOffice_urls.json", "w", encoding="utf-8") as f:
    json.dump(clean_url, f, indent=2)

print("done 👌")

    
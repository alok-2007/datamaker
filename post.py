import pandas as pd
import json
import re
import csv

df = pd.read_csv("postoffice.csv")
df = df.fillna('')

with open("pin.json", "r") as pi:
    pinQ = json.load(pi)

url = []

data = []
data.append(["key","name","type","district","state","pincode","delivery","division","region","circle","postOfficeOfPincode"])
postOFFICEpattern = r"\b(?:P\.?O\.?|H\.?O\.?|G\.?P\.?O\.?|D\.?O\.?P\.?|M\.?D\.?G\.?|S\.?O\.?|B\.?O\.?|M\.?P\.?C\.?M\.?|N\.?S\.?H\.?|I\.?C\.?H\.?|S\.?P\.?O\.?|A\.?P\.?O\.?|C\.?P\.?M\.?G\.?)\b"

def postoffice_clean(po):
    if not isinstance(po, str):
        return ""
    po = re.sub(r"\s*\(", " ", po)
    po = re.sub(r"\s*\)", " ", po)
    po = re.sub(postOFFICEpattern, "", po)
    po = re.sub(r"\s+", " ", po)
    return po.strip().lower()

def nameClean(n):
    n = re.sub(r"\'", "-", n)
    n = re.sub(r"\,", " ", n)
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


def keymaker(s, d, o):
    s = s.lower().replace(" ", "-")
    d = re.sub(r"\s*\(.*", "", d)
    d = d.lower().replace(" ", "-")
    o = postoffice_clean(o)
    o = o.replace(" ", "-")
    o = o.replace("/", "")
    s = nameClean(s)
    d = nameClean(d)
    o = nameClean(o)
    return f"{s}/{d}/{o}"

def postOfficeOfPincode_giver(pin, postName):
    posts = pinQ.get(str(pin))
    postOfficeOfPincode = '<ul class="backlink">'
    for arr in posts:
        if (arr[1] == postName):
            continue
        postOfficeOfPincode += f'<li><a href="/{arr[0]}">{arr[1]}</a></li>'
    postOfficeOfPincode += '</ul>'
    return postOfficeOfPincode

def clean_type(off, sec):
    match = re.findall(postOFFICEpattern, off)
    if not match:
        sec = sec.replace(".", "")
        if sec == "PO":
            return "Post Office"
        if sec == "GPO":
            return "General Post Office"
        if sec == "HO":
            return "Head Office"
        if sec == "DOP":
            return "Department of Posts"
        if sec == "MDG":
            return "Mukhya Dak Ghar"
        if sec == "SO":
            return "Sub Office"
        if sec == "BO":
            return "Branch Office"
        if sec == "MPCM":
            return "Post Office Multi-Purpose-Counter Missions"
        if sec =="NSH":
            return "National Sorting Hub"
        if sec == "ICH":
            return "Intra Circle Hub"
        if sec == "SPO":
            return "Student Post Office"
        if sec == "APO":
            return "Army Post Office"
        if sec == "CPMG":
            return "Chief Postmaster General"
        return sec
    ot = match[0].replace(".", "")
    if ot == "PO":
        return "Post Office"
    if sec == "GPO":
        return "General Post Office"
    if sec == "HO":
        return "Head Office"
    if ot == "DOP":
        return "Department of Posts"
    if ot == "MDG":
        return "Mukhya Dak Ghar"
    if ot == "SO":
        return "Sub Office"
    if ot == "BO":
        return "Branch Office"
    if ot == "MPCM":
        return "Post Office Multi-Purpose-Counter Missions"
    if ot =="NSH":
        return "National Sorting Hub"
    if ot == "ICH":
        return "Intra Circle Hub"
    if ot == "SPO":
        return "Student Post Office"
    if ot == "APO":
        return "Army Post Office"
    if ot == "CPMG":
        return "Chief Postmaster General"
    return ot

def districtClean(dist):
    dist = re.sub(r"\s*\(.*", "", dist)
    dist = dist.lower().replace(" ", "-")
    return dist.upper().replace("-", " ");

def dClean(d):
    d = re.sub(r"\s*(Division)$", "", d).upper()
    return d

def rClean(r):
    r = re.sub(r"\s*(Region)$", "", r).upper()
    return r

def cClean(c):
    c = re.sub(r"\s*(Circle)$", "", c).upper()
    return c

for i in df.itertuples(index=False):
    name = postoffice_clean(i.officename).upper().replace("-"," ")
    type = clean_type(i.officename,i.officetype).upper()
    district = districtClean(i.district) if not i.district == "" else dClean(i.divisionname)
    state = i.statename.upper().replace("-", " ") if not i.statename == ""  else cClean(i.circlename)
    pincode = i.pincode
    delivery = i.delivery
    division = dClean(i.divisionname)
    region = rClean(i.regionname)
    circle = cClean(i.circlename)
    sz = i.statename if i.statename  else cClean(i.circlename).replace("-", " ").strip()
    dz = districtClean(i.district) if i.district else dClean(i.divisionname).replace("-", " ").strip()
    key = keymaker(str(sz), str(dz), str(i.officename))
    postOfficeOfPincode = postOfficeOfPincode_giver(i.pincode, name)
    data.append([
        key,
        name,
        type,
        district,
        state,
        pincode,
        delivery,
        division,
        region,
        circle,
        postOfficeOfPincode
    ])
    url.append(f"https://searchpincode.in/{key}")

with open('post.csv', mode='w', newline="") as f:
    writer = csv.writer(f)
    writer.writerows(data)

with open("postoffice_url.json", "w", encoding="utf-8") as u:
    json.dump(url, u, indent=2)

print("done👌")
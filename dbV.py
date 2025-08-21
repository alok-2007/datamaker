import pandas as pd
import os
import re
import json

start = 1
end = 20000

result = ""

url = []

to_read = "Delhi"

df = pd.read_csv(f'States_vill/{to_read}_vill.csv');

def escape(n):
    return str(n).replace("'", "''")

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

def clean_sds(text):
    text = re.sub(r"\s*\(.*", "", text)
    return text.upper();

def spec_vill(vill):
    # Collapse dotted abbreviations: S.P. -> SP, A.B.C -> ABC
    vill = re.sub(r'(?:\b([A-Za-z])\.)+', lambda m: ''.join(re.findall(r'[A-Za-z]', m.group(0))), vill)

    # Remove trailing non-word chars
    vill = re.sub(r"[^\w]$", "", vill)
    vill = vill.replace("*", " ")

    vill = re.sub(r"^([\w\s]+)(\(\w+)$", r"\1 \2)", vill)
    vill = re.sub(r"\s{2,}", " ", vill)
    # Remove leading non-word chars
    vill = re.sub(r"^[^\w]", "", vill).strip()
    vill = re.sub(r"^(\w{1,})/(\w{1,})$", r"\1 (\2)", vill)

    return vill.upper()


def clean_vill(villageName):
    villageName = re.sub(r"[()]", " ", villageName).lower()
    villageName = villageName.replace("*", "")
    villageName = re.sub(r"^\s*\-\s*", "", villageName)
    villageName = re.sub(r"\s*\-\s*$", "", villageName)
    villageName = re.sub(r"\s*\-\s*", "-", villageName)
    villageName = re.sub(r'\"', " ", villageName)
    if "." in villageName:
        villageName = re.sub(r"\s*\.\s*$", "", villageName)
        villageName = re.sub(r"^\s*\.\s*", "", villageName)
        villageName = re.sub(r"\s\.\s", " ", villageName)
        villageName = re.sub(r"\s*\.\s*(?=([a-z0-9\-]{2,}))", " \1", villageName)
        villageName = re.sub(
            r'(?:\b([a-zA-Z])\.\s*)+',
            lambda m: ''.join(re.findall(r'[a-zA-Z]', m.group(0))),
            villageName
        )
        villageName = re.sub(r'\s*\.\s*', '-', villageName)
        villageName = re.sub(r'\.-*$', '', villageName)
    villageName = re.sub(r"\s+", "-", villageName).strip()
    villageName = re.sub(r"\.+", "", villageName)
    villageName = re.sub(r"\/+", "-", villageName)
    villageName = re.sub(r"[^a-zA-Z0-9\-]", "", villageName)
    villageName = re.sub(r"\-+", "-", villageName)
    villageName = re.sub(r"^\-", "", villageName)
    villageName = re.sub(r"\-$", "", villageName)
    return villageName.strip()

def make_key(vill, subDist, dist, state):
    vill = clean_vill(vill)

    sub_dist_processed = clean_vill(subDist.replace('/', "-"))
    dist_processed = clean_vill(dist.replace('/', "-"))
    state_processed = clean_vill(state.replace(" ", "-"))

    subdist = ""
    if sub_dist_processed == dist_processed:
        subdist = dist_processed
    else:
        subdist = f"{sub_dist_processed}-{dist_processed}"

    return f"{vill}-{subdist}-{state_processed}"

def key_dist(s, d):
    s = s.lower().replace(" ", "-")
    d = re.sub(r"\s*\(.*", "", d)
    d = d.lower().replace(" ", "-")
    s = nameClean(s)
    d = nameClean(d)
    return f"{s}/{d}"

subset = df.iloc[start:end]

for i in subset.itertuples(index=False):
    key = make_key(i.villageNameEnglish, i.subdistrictNameEnglish, i.districtNameEnglish, i.stateNameEnglish)
    villName = spec_vill(i.villageNameEnglish)
    if "NOT YET NAMED" in villName:
        continue
    url.append(f'https://searchpincode.in/{escape(key)}')
    sql = f"""INSERT INTO "vill" VALUES('{escape(key)}','{escape(villName)}','{escape(clean_sds(i.subdistrictNameEnglish))}','{escape(clean_sds(i.districtNameEnglish))}','{escape(key_dist(i.stateNameEnglish, i.districtNameEnglish))}','{escape(clean_sds(i.stateNameEnglish))}','{escape(i.pincode)}', '{escape(i.villageCode)}');"""
    result += sql + "\n"

os.makedirs("villSQL", exist_ok=True)
os.makedirs("villURL", exist_ok=True)
num = 1
while os.path.exists(f"villSQL/insert_{num}.sql"):
    num += 1

with open(f"villSQL/insert_{num}.sql", "w", encoding="utf-8") as f:
    f.write(result)

num = 1

while os.path.exists(f"villURL/{to_read}_Url_{num}.json"):
    num += 1

with open(f"villURL/{to_read}_Url_{num}.json", 'w', encoding="utf-8") as u:
    json.dump(url, u, indent=2)
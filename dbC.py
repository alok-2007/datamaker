import pandas as pd
import os
import re
import json

start = 160000
end = 170000

result = ""

url = []

df = pd.read_csv("post.csv");


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

def key_dist(s, d):
    s = s.lower().replace(" ", "-")
    d = re.sub(r"\s*\(.*", "", d)
    d = d.lower().replace(" ", "-")
    s = nameClean(s)
    d = nameClean(d)
    return f"{s}/{d}"

subset = df.iloc[start:end]

for i in subset.itertuples(index=False):
    url.append(f'https://searchpincode.in/{escape(i.key)}')
    sql = f"""INSERT OR REPLACE INTO "post" VALUES('{escape(i.key)}','{escape(i.name)}','{escape(i.type)}','{escape(i.district)}','{escape(key_dist(i.state, i.district))}','{escape(i.state)}','{escape(i.pincode)}','{escape(i.delivery)}','{escape(i.division)}','{escape(i.region)}','{escape(i.circle)}','{escape(i.postOfficeOfPincode)}');"""
    result += sql + "\n"

os.makedirs("insSQL", exist_ok=True)
os.makedirs("insURL", exist_ok=True)
num = 1
while os.path.exists(f"insSQL/insert_{num}.sql"):
    num += 1

with open(f"insSQL/insert_{num}.sql", "w", encoding="utf-8") as f:
    f.write(result)

with open(f"insURL/url_{num}.json", 'w', encoding="utf-8") as u:
    json.dump(url, u, indent=2)
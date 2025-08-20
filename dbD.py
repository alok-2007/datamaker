import pandas as pd
import re
import json

df = pd.read_csv("post.csv")

print(len(df['district'].unique()))

count = 0
result = ""
url = []

state_uni = df['state'].unique()

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

def get_slug(d):
    d = re.sub(r"\s*\(.*", "", d)
    d = nameClean(d)
    return d.upper().replace("-", " ");

def get_key(s, d):
    s = s.lower().replace(" ", "-")
    d = re.sub(r"\s*\(.*", "", d)
    d = d.lower().replace(" ", "-")
    s = nameClean(s)
    d = nameClean(d)
    return f"{s}/{d}"

for state in state_uni:
    state = str(state)
    filt = df[df['state'] == state]
    dist_uni = filt['district'].unique()
    for dist in dist_uni:
        count += 1
        filt2 = df[(df['district'] == dist) & (df['state'] == state)]
        num_of_post = len(filt2)
        key = get_key(state, dist)
        formatted = '<ol id="post-list">'
        for office in filt2.itertuples(index=False):
            formatted += f'<li><a href="/{office.key}">{office.name}</a></li>'
        formatted += "</ol>"
        sql = f"""INSERT INTO "dist" VALUES('{key}', '{get_slug(dist)}', '{state}','{formatted}', '{num_of_post}');"""
        result += sql + "\n"
        url.append(f"https://searchpincode.in/{key}")

with open("dist.sql", "w", encoding="utf-8") as f:
    f.write(result)

with open("dist_url.json", "w", encoding="utf-8") as u:
    json.dump(url, u, indent=2)

print(count)
import pandas as pd
import re
import json

df = pd.read_csv("post.csv")

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

def get_key(s):
    s = str(s)
    s = s.lower().replace(" ", "-")
    return nameClean(s)

def get_slug(s, d):
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
    num_of_dist = len(dist_uni)
    formatted = '<ol id="dist-list">'
    key = get_key(state)
    url.append(f"https://searchpincode.in/{key}")
    for dist in dist_uni:
        slug = get_slug(state, dist)
        formatted += f'<li><a href="/{slug}">{dist}</a></li>'
    formatted += "</ol>"
    sql = f"""INSERT INTO "state" VALUES('{key}','{state}','{formatted}', '{num_of_dist}');"""
    result += sql + "\n"

with open("state.sql", "w", encoding="utf-8") as f:
    f.write(result)

with open("state_url.json", "w", encoding="utf-8") as u:
    json.dump(url, u, indent=2)
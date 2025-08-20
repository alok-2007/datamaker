import pandas as pd
import os
import re
import json


result = ""

df = pd.read_csv("post.csv");

uniPincode = df["pincode"].unique()
uniPincode = sorted(uniPincode)

def get_postofsamepincode(i):
    filtered = df[df["pincode"] == i]
    postOfficeOfPincode = '<ul class="backlink">'
    for _, filt in filtered.iterrows():
        postOfficeOfPincode += f'<li><a href="/{filt["key"]}">{filt["name"]}</a></li>'
    postOfficeOfPincode += '</ul>'
    return postOfficeOfPincode
        

def escape(n):
    return str(n).replace("'", "''")

for Pin in uniPincode:
    formatted = get_postofsamepincode(Pin)
    sql = f"""INSERT INTO "postofficeofsamepincode" VALUES('{escape(Pin)}','{escape(formatted)}');"""
    result += sql + "\n"

os.makedirs("pofspSQL", exist_ok=True)
num = 1
while os.path.exists(f"pofspSQL/insert_{num}.sql"):
    num += 1

with open(f"pofspSQL/insert_{num}.sql", "w", encoding="utf-8") as f:
    f.write(result)
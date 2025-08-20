import json
import os
import pandas as pd

result = ""

df = pd.read_csv("postoffice.csv")

with open("pintopost.json" , "r", encoding="utf-8") as f:
    data = json.load(f)

def escape(n):
    return str(n).replace("'", "''")

start = 18000
end = 21000

cutted = dict(list(data.items())[start:end])

for pincode , office in cutted.items():
    filt = df[df['pincode'] == int(pincode)]
    num_of_post = len(filt)
    first_row = filt.iloc[0] if not filt.empty else None
    sql = f"""INSERT INTO "pin" VALUES('{pincode}','{office}','{first_row.district}', '{first_row.statename}', '{num_of_post}');"""
    result += sql + "\n"

os.makedirs("pSQL", exist_ok=True)

count = 1

while os.path.exists(f"pSQL/pinSQL_{count}.sql"):
    count += 1

with open(f"pSQL/pinSQL_{count}.sql", "w", encoding="utf-8") as f:
    f.write(result)
import json

with open("pintopost.json" , "r", encoding="utf-8") as f:
    data = json.load(f)

keys = list(data.keys());

print(keys);


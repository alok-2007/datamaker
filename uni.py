import json
import os

# Load all 4 files
with open("insURL/url_13.json", "r", encoding="utf-8") as f1:
    data1 = json.load(f1)
with open("insURL/url_14.json", "r", encoding="utf-8") as f2:
    data2 = json.load(f2)
with open("insURL/url_15.json", "r", encoding="utf-8") as f3:
    data3 = json.load(f3)
with open("insURL/url_16.json", "r", encoding="utf-8") as f4:
    data4 = json.load(f4)
with open("insURL/url_17.json", "r", encoding="utf-8") as f5:
    data5 = json.load(f5)

# Combine all lists
combined = data1 + data2 + data3 + data4 + data5

# Remove duplicates using set
uni_combined = list(set(combined))

# Optional: sort alphabetically
uni_combined.sort()

# Auto-increment output filename
count = 1
while os.path.exists(f'posturl_{count}.json'):
    count += 1

# Save result
with open(f"posturl_{count}.json", 'w', encoding="utf-8") as f:
    json.dump(uni_combined, f, indent=2, ensure_ascii=False)

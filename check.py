import json

# Load JSON data
with open('postoffice_url.json') as f1, open('postOffice_urls.json') as f2:
    json1 = json.load(f1)
    json2 = json.load(f2)

# Convert second list to a set for fast lookup
set2 = set(json2)
count = 0

# Print values only in json1 and not in json2
for value in json1:
    if value not in set2:
        count = count + 1
        print(value)

print(count)

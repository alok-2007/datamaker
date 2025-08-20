import json

with open("pin.json", "r", encoding="utf-8") as asd:
    data = json.load(asd)

result = {}

def sURL(s):
    return s.lower().replace(" ", "-")

for pincode , offices in data.items():
    p = ""
    for i in offices:
        p += '<section class="tab">'
        p += f'<h2 class="lower">{i[1]}, {i[3]}</h2>'
        p += '<table>'
        p += f'<tr><th>Post Office</th><td><a href="/{i[0]}">{i[1]}</a></td></tr>'
        p += f'<tr><th>Office Type</th><td>{i[2]}</td></tr>'
        p += f'<tr><th>District</th><td><a href="/{i[10]}">{i[3]}</a></td></tr>'
        p += f'<tr><th>State</th><td><a href="/{sURL(i[4])}">{i[4]}</a></td></tr>'
        p += f'<tr><th>Pin Code</th><td><a href="/{pincode}">{pincode}</a></td></tr>'
        p += f'<tr><th>Delivery</th><td>{i[6]}</td></tr>'
        p += f'<tr><th>Division</th><td>{i[7]}</td></tr>'
        p += f'<tr><th>Region</th><td>{i[8]}</td></tr>'
        p += f'<tr><th>Circle</th><td>{i[9]}</td></tr>'
        p += f'</table>'
        p += f'</section>'
    result[pincode] = p

with open("pintopost.json", "w", encoding="utf-8") as p:
    json.dump(result, p, indent=2)
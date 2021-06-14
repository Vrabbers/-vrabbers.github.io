import re
import json

pattern = re.compile(r"(.+)\n((?:.+\n)+)(?:\n|$)")

with open("dictionary.txt", "r") as r:
    file_data = r.read()    

dictionary = { match.group(1): match.group(2).strip() for match in pattern.finditer(file_data) }

with open("dictionary.json", "w") as w:
    json.dump(dictionary, w, indent = 4)

import json;

initialConsonants = [
    "", "m", "n", "ny", "ng",
    "p", "b", "t", "d", "ky", "gy", "k", "g",
    "ts", "dz",
    "f", "v", "s", "z", "hy", "zy", "h",
    "y", "w",
    "l", "ly",
    "r" ]

vowels = [ "a", "e", "i", "o", "u", "aa", "ee", "ii", "oo", "uu" ]

finalConsonants = [
    "", "m", "n", "ny", "ng",
    "p", "t", "ky", "k",
    "y", "w",
    "l", "ly",
    "r" ]

index = 0xF0000

characterDict = {}
nameList = ""
html = ""

for ic in initialConsonants:
    for v in vowels:
        for fc in finalConsonants:
            characterDict[ic + v + fc] = index
            nameList += hex(index) + " " + ic + v + fc + "\n"
            html += "&#" + str(index) + ": " + ic + v + fc + "<br>\n"
            index += 1

jsondict = json.dumps(characterDict)
with open("chardict.json", "w") as jsonFile:
    jsonFile.write(jsondict)

with open("namelist.nam", "w") as nameFile:
    nameFile.write(nameList)

with open("html.txt", "w") as htmlFile:
    htmlFile.write(html)



import fontforge
import json

data = {}
with open("chardict.json") as jsonFile:
    data = json.load(jsonFile)

font = fontforge.font()

font.em = 160

for name in data:
    g = font.createChar(data[name])
    g.importOutlines("syllables/_" + name + ".svg")
    g.width = 160

font.save("test.sfd")
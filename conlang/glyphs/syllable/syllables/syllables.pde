import processing.svg.*;
size(160, 160);

String[] initialConsonants = new String[] 
{ null, "m", "n", "ny", "ng",
  "p", "b", "t", "d", "ky", "gy", "k", "g",
  "ts", "dz",
  "f", "v", "s", "z", "hy", "zy", "h",
  "y", "w",
  "l", "ly",
  "r",
};
String[] vowels = new String[] 
{ "a", "e", "i", "o", "u" };
  
String[] finalConsonants = new String[] 
{ null, "m", "n", "ny", "ng",
  "p", "t", "ky", "k",
  "y", "w",
  "l", "ly",
  "r",
  null
};
 
boolean[] accent = new boolean[] {true, false};


PShape accline = loadShape("accent.svg");
for (String ic : initialConsonants) {
  for (String v : vowels) {
    for (String fc: finalConsonants) {
      for (boolean a : accent) {
        String name = (ic == null ? "" : ic) + v + (a ? v : "") + (fc == null ? "" : fc) + ".svg"; 
        PGraphics g = createGraphics(160, 160, SVG, "_" + name);
        g.beginDraw();
        if (a) g.shape(accline);
        if (ic == null && fc == null) {
          PShape vshape = loadShape(v + ".svg");
          g.shape(vshape);
        } else if (ic != null && fc == null) {
          PShape icshape = loadShape(ic + "_short.svg");
          PShape vshape = loadShape(v + "_short.svg");
          g.shape(icshape);
          g.shape(vshape);
        } else if (ic == null && fc != null) {
          PShape fcshape = loadShape(fc + "_short.svg");
          PShape vshape = loadShape(v + "_short.svg");  
          g.shape(fcshape, 0, 70);
          g.shape(vshape, 0, -70);
        } else {
          PShape icshape = loadShape(ic + "_short.svg");
          PShape vshape = loadShape(v + "_tiny.svg");
          PShape fcshape = loadShape(fc + "_tiny.svg");
          g.shape(icshape);
          g.shape(vshape);
          g.shape(fcshape);
        }
        g.endDraw();
        g.dispose();
        println(name);
      }
    }
  }
}

exit();

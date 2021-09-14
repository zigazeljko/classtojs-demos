CLASSTOJS ?= classtojs
CURL ?= curl
JAVAC ?= javac

JBOX2D_URL ?= https://repo1.maven.org/maven2/org/jbox2d/jbox2d-library/2.2.1.1/jbox2d-library-2.2.1.1.jar
MINECRAFT4K_URL ?= https://web.archive.org/web/20141101155117oe_/https://mojang.com/notch/j4k/minecraft4k/M.jar

.ALL: all
.PHONY: all clean

all: attractor/attractor.js jbox2d/main.js minecraft4k/M.js

attractor/attractor.js: attractor/Attractor.class
	$(CLASSTOJS) attractor/Attractor.class attractor/attractor.js

attractor/Attractor.class: attractor/Attractor.java
	$(JAVAC) attractor/Attractor.java

jbox2d/main.js: jbox2d.toml jbox2d/Scene.class
	$(CLASSTOJS) jbox2d.toml jbox2d/main.js

jbox2d/Scene.class: jbox2d/Scene.java jbox2d/jbox2d-library-2.2.1.1.jar
	$(JAVAC) -cp jbox2d/jbox2d-library-2.2.1.1.jar jbox2d/Scene.java

jbox2d/jbox2d-library-2.2.1.1.jar:
	$(CURL) -sf $(JBOX2D_URL) -o jbox2d/jbox2d-library-2.2.1.1.jar

minecraft4k/M.js: minecraft4k.toml minecraft4k/M.jar
	$(CLASSTOJS) minecraft4k.toml minecraft4k/M.js

minecraft4k/M.jar:
	$(CURL) -sf $(MINECRAFT4K_URL) -o minecraft4k/M.jar

clean:
	rm -f */*.class */*.pgm attractor/attractor.js jbox2d/*.jar jbox2d/main.js minecraft4k/M.jar minecraft4k/M.js


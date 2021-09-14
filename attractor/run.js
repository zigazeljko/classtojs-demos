#!/usr/bin/env node

var fs = require("fs"),
    attractor = require("./attractor");

var obj = new attractor.Attractor();
obj.$init(-1.8, -2.3, -1.7, -1.2);
var pixels = obj.render(0, 0, 10000000, 1024);

var header = Buffer.from("P5\n1024 1024\n255\n");
fs.writeFileSync("output.pgm", Buffer.concat([header, new Uint8Array(pixels)]));

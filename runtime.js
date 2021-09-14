Object.defineProperty(Object.prototype, "_equals", {
  value: function (other) { return this == other; }
});

Object.defineProperty(Object.prototype, "_hash", {
  value: function () { return $javahashcode(this); }
});

Object.defineProperty(Object.prototype, "_tostr", {
  value: function () { return this.constructor.name + "@" + $javahashcode(this); }
});

$javanewarray = function (type, size) {
  size = size|0;
  var array = new type(size);
  for (var i = 0; i < size; i++) {
    array[i] = null;
  }
  return array;
};

$javamultinewarray = function (type, size, esize, ...rest) {
  size = size|0;
  var etype = type.elementType, array = new type(size);
  for (var i = 0; i < size; i++) {
    array[i] = (rest.length ? $javamultinewarray(etype, esize, ...rest) : $javanewarray(etype, esize));
  }
  return array;
};

$javamultiprimarray = function (type, size, esize, ...rest) {
  size = size|0;
  var etype = type.elementType, array = new type(size);
  for (var i = 0; i < size; i++) {
    array[i] = (rest.length ? $javamultiprimarray(etype, esize, ...rest) : new etype(size));
  }
  return array;
};

$javahashcode = function (obj) {
  if (!obj) return 0;
  var id = obj.$idhash|0;
  if (!id) {
    id = ((Object.$lastid|0)+1)|0;
    Object.$lastid = id;
    obj.$idhash = id;
  }
  return id;
};

$javaarraycopy = function (src, sp, dst, dp, len) {
  sp = sp|0;
  dp = dp|0;
  len = len|0;
  if (src === dst && sp > dp) {
    sp += len;
    dp += len;
    while (len-- > 0) dst[--dp] = src[--sp];
  } else {
    while (len-- > 0) dst[dp++] = src[sp++];
  }
};

$javamillitime = function () {
  return BigInt(Date.now());
};

$javananotime = function () {
  return BigInt.asIntN(64, BigInt(Math.round(performance.now() * 1000000)));
};

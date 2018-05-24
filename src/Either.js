var Left = function(x) {
  this.__value = x;
}

Left.of = function(x) {
  return new Left(x);
}

Left.prototype.map = function(f) {
  return this;
}
Left.prototype.isNothing = function() {
  return (this.__value === null || this.__value === undefined);
}
Left.prototype.join = function() {
  return this.isNothing() ? Left.of(null) : this.__value;
}

var Right = function(x) {
  this.__value = x;
}

Right.of = function(x) {
  return new Right(x);
}

Right.prototype.map = function(f) {
  return Right.of(f(this.__value));
}
Right.prototype.isNothing = function() {
  return (this.__value === null || this.__value === undefined);
}

Right.prototype.join = function() {
  return this.isNothing() ? Left.of(null) : this.__value;
}

export {
  Left,
  Right
}
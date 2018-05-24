import {
  Left,
  Right
} from './Either.js';

import { compose,curry,map,join } from './util.js';

var IO = function(f) {
  this.__value = f;
}

IO.of = function(x) {
  return new IO(function() {
    return x;
  });
}
IO.prototype.isNothing = function() {
  return (this.__value === null || this.__value === undefined);
}
IO.prototype.map = function(f) {
  return new IO(compose(this.__value, f ));
}
IO.prototype.join = function() {
  return this.isNothing() ? Left.of(null) : this.__value();
}
IO.prototype.chain = function(f){
  return this.map(f).join();
};

export default IO
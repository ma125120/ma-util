import {
  isArray,
  isObject,
  isFunction,
  toArray,
  rgbToHex,
  getRandomName,
	toFormData,
	strToObject,
	validateData,
	ObjectToArray
} from './object.js'

import {
	insertArray
} from './array.js'

import IO from './IO.js'

import {
  Left,
  Right
} from './Either.js'

import {
	setStoreData,
	curry,
	compose,
	composeRight,
	toUpper,
	head,
	last,
	isExist,
	map,
	filter,
	prop,
	setProp,
	split,
	assign,
	join,
	log,
	chain,
	id,
	then,
	ap,
	add,
	_add,
	reduce,
	match,
} from './util.js'



// compose(addStr,first,toUpper)("this is a low")
// composeRight(first,toUpper,addStr)("this is a low")
// var addFive = curry(function(...args){
// 	return args.reduce((a,b)=>a+b,0)
// },3)(5,6)

// console.log(addFive(6))

var Maybe = function(x) {
  this.__value = x;
}

Maybe.of = function(x) {
  return new Maybe(x);
}

Maybe.prototype.isNothing = function() {
  return (this.__value === null || this.__value === undefined);
}

Maybe.prototype.map = function(f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
}
Maybe.prototype.join = function() {
  return this.isNothing() ? Maybe.of(null) : this.__value;
}

var withdraw = curry(function(amount, account) {
  return account.balance >= amount ?
    Maybe.of({balance: account.balance - amount}) :
    Left.of(`当前余额为${account.balance},不足以支付${amount}`);
});
var getRemain = compose(withdraw(20),map(prop('balance')));
console.log(getRemain({ balance: 10.00}).__value)

export {
	isArray,
  isObject,
  isFunction,
  toArray,
  rgbToHex,
  getRandomName,
	toFormData,
	strToObject,
	validateData,
	ObjectToArray,
	
	curry,
	compose,
	composeRight,
	toUpper,
	head,
	last,
	isExist,
	map,
	filter,
	prop,
	setProp,
	split,
	assign,
	join,
	log,
	chain,
	id,
	then,
	ap,
	add,
	_add,
	reduce,
	match,

	insertArray,
	Maybe,
	Left,
	Right,

	IO

}
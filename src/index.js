import {
  isArray,
  isObject,
  isFunction,
  toArray,
  rgbToHex,
  getRandomName,
  toFormData
} from './object.js'

import {
	insertArray
} from './array.js'

var curry = function (fn,arity=fn.length) {
	return _curry(fn,arity);
}
var _curry = function _curry(fn,arity=fn.length,...args) {
	var argLen = args.length;
	if(argLen < arity) {
		return _curry.bind(null,fn,arity,...args);
	} else {
		return fn(...args);
	}
}

var compose = (...fns) =>{
	var [firstFn,...nestFn] = fns;
	return x=>nestFn.reduce((f,g)=>g(f),firstFn(x));
}
var composeRight = (...fns) =>{
	var [...nestFn,lastFn] = fns;
	var lastFn = last(fns);
	return x=>fns.reduceRight((f,g)=>g(f),lastFn(x));
}
var toUpper = function(str) {
	return str.toUpperCase();
}
var first = function(data) {
	return data[0];
}
var last = function(data) {
	return data.slice(-1)
}
var isExist = function(str) {
	return str !== undefined 
}

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

export {
	isArray,
  isObject,
  isFunction,
  toArray,
  rgbToHex,
  getRandomName,
	toFormData,
	
	curry,
	compose,
	composeRight,
	toUpper,
	first,
	last,
	isExist,

	insertArray

}
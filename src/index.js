import {
  isArray,
  isObject,
  isFunction,
  toArray,
  rgbToHex,
  getRandomName,
	toFormData,
	strToObject,
	validateData
} from './object.js'

import {
	insertArray
} from './array.js'

import IO from './IO.js'

import {
  Left,
  Right
} from './Either.js'

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
	var nestFn = fns.slice(0,-1),
			lastFn = fns.slice(-1);
	return x=>fns.reduceRight((f,g)=>g(f),lastFn(x));
}
var toUpper = curry(function(str) {
	return str.toUpperCase();
})
var sureReturn = function(data,fn) {
	return isNull(data) ? (Left.of(data)) : (fn());
}
var isNull = curry(function(data) {
	return data === null; 
})
var isExist = curry(function(str) {
	return str !== undefined 
})
var prop = curry(function(prop,data) {
	return data[prop]
});
var setProp = curry(function(prop,value,data) {
	data[prop] = value;
	return data;
});
var map = curry(function(f,data) {
  return data.map(f)
});
var filter = curry(function(f,data) {
  return data.filter(f)
});
var split = curry(function(str,data) {
	return sureReturn(data, ()=>(isExist(data && data.split) ? (data.split(str)) : (Left.of(data))))
});
var head = curry(function(data) {
  return isNull(data) ? (Left.of(data)) : (data[0]);
});
var last = curry(function(data) {
	return sureReturn(data, ()=>(isExist(data && data.split) ? (data.slice(-1)) : (Left.of(data))))
});
var eq = curry(function(key,data) {
  return key == data
});


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
var withdraw = curry(function(amount, account) {
  return account.balance >= amount ?
    Maybe.of({balance: account.balance - amount}) :
    Maybe.of(null);
});
var getRemain = compose(withdraw(20),map(prop('balance')));
getRemain({ balance: 200.00})

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
	Maybe,

	insertArray,

	IO

}
import { isArray,isObject, isFunction } from './object.js'
import {
  Left,
  Right
} from './Either.js'

var setStoreData = function setStoreData(state,keys,data) {
  if(typeof keys == "string") {
    state[keys] = data;
    return state;
  }
	if(!isArray(keys)) {
		throw new Error("keys必须为数组");
	}
	var [first, ...arr] = keys;
	var obj = state[first];
	if(isArray(obj)) {
		obj = [...obj];
	} else if(isObject) {
		obj = Object.assign({},obj);
	}

	arr.reduce((obj,name,i)=>{
		obj[name] = obj[name] || {};
		if(i == arr.length-1) {
			obj[name] = data;
		}
		return obj[name];
	},obj);
	if(arr.length == 0) {
		state[first] = data;
	} else {
		state[first] = obj;
	}
	return state;
}
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
	return isNothing(data) ? (null) : (fn());
}
var isNull = curry(function(data) {
	return data === null; 
})
var isExist = curry(function(str) {
	return str !== undefined 
});
var isNothing = curry(function(str) {
	return (str === null || str === undefined);
});

var map = curry(function(f, data) {
	return sureReturn(data, ()=>(isExist(data.map) ? (data.map(f)) : (Left.of(`该值不存在map方法`))));
});
var reduce = curry(function(f, data) {
	return sureReturn(data, ()=>(isExist(data.reduce) ? (data.reduce(f)) : (Left.of(`该值不存在reduce方法`))));
});
var match = curry(function(f, data) {
	return sureReturn(data, ()=>(isExist(data.match) ? ( isFunction(f) ? (data.match(f)) : ((Left.of(`match参数不完整`)))) : (Left.of(`该值不存在match方法`))));
});
var test = curry(function(reg, data) {
	return sureReturn(data, () => (reg.test(data)));
});
var replace = curry(function(reg,f, data) {
	return sureReturn(data, ()=>(isExist(data.replace) ? ( (isFunction(f) && isExist(reg)) ? (data.replace(reg, f)) : ((Left.of(`replace参数不完整`)))) : (Left.of(`该值不存在replace方法`))));
});
var then = curry(function(f, data) {
	return sureReturn(data, ()=>(isExist(data.then) ? (data.then(f)) : (Left.of(`该值不存在then方法`))));
});
var filter = curry(function(f, data) {
  return sureReturn(data, ()=>(isExist(data.filter) ? (data.filter(f)) : (Left.of(`该值不存在filter方法`))));
});
var split = curry(function(str, data) {
	return sureReturn(data, ()=>(isExist(data.split) ? (data.split(str)) : (Left.of(`该值不存在split方法`))))
});
var head = curry(function(data) {
  return isNull(`该值不存在第一个元素`) ? (Left.of(data)) : (data[0]);
});
var last = curry(function(data) {
	return sureReturn(data, ()=>(isExist(data.slice) ? (data.slice(-1)) : (Left.of(`该值不存在最后一个元素`))))
});
var eq = curry(function(key,data) {
  return key == data
});
var join = function(data){
	return sureReturn(data, ()=>(isExist(data && data.join) ? (data.join()) : Left.of(`该值不存在join方法`)))
}
var assign = curry(function(data) {
	return sureReturn(data,()=> ( isArray(data) ? ([...data]) : (isObject(data) ? (Object.assign({},data)) : (data) ) ) )
});
var log = function(x) {
	console.log(x);
	return x;
}
var chain = curry(function(f, m){
  return compose(map(f), join)(m);
});
var id = curry(function(data){
  return data;
});
var prop = curry(function(prop,data) {
	return sureReturn(data,()=> isExist(data[prop]) ? data[prop] : Left.of(`该值的${prop}属性不存在`)  );
});
var setProp = curry(function(prop,value,data) {
	return sureReturn(data,()=> setStoreData(assign(data),prop,value) );
});
var ap = curry(function(data,f) {
	return sureReturn(data,()=> data.map(f) );
});
var add = curry(function(a,b) {
	return a+b;
});
var _add = function(...args) {
	return args.reduce((a,b)=>a+b,0)
};

export {
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
	replace,
	test
}
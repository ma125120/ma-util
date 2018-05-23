var IO = function(f) {
  this.__value = f;
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
IO.of = function(x) {
  return new IO(function() {
    return x;
  });
}
var map = curry(function(f,data) {
  return data.map(f)
});
var head = curry(function(data) {
  return data[0]
});
var last = curry(function(data) {
  return data.slice(-1)
});
var eq = curry(function(key,data) {
  return key == data
});
var split = curry(function(str,data) {
  console.log(str,data)
  return data.split(str)
});
var filter = curry(function(f,data) {
  return data.filter(f)
});
var compose = (...fns) =>{
	var [firstFn,...nestFn] = fns;
	return x=>nestFn.reduce((f,g)=>g(f),firstFn(x));
}
IO.prototype.map = function(f) {
  return new IO(compose(f, this.__value));
}
//  url :: IO String
var url = new IO(function() { return window.location.href; });

//  toPairs =  String -> [[String]]
var toPairs = compose(map(split('=')), split('&'));

//  params :: String -> [[String]]
var params = compose(toPairs, last, split('?'));

//  findParam :: String -> IO Maybe [String]
var findParam = function(key) {
  return map(compose(filter(compose(eq(key), head)), params), url);
};

////// 非纯调用代码: main.js ///////

// 调用 __value() 来运行它！
findParam("searchTerm").__value();


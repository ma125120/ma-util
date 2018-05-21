var isArray = function(data) {
	return Object.prototype.toString.call(data).slice(8,-1) == "Array";
};
var isObject = function(data) {
	return Object.prototype.toString.call(data).slice(8,-1) == "Object";
};
var isFunction = function(data) {
	return Object.prototype.toString.call(data).slice(8,-1) == "Function";
};

var toArray = function(obj) {
  var keys = Object.keys(obj),
      arr = [];

  keys.map(key=>{
    if(!isNaN(+key)) {
      arr[key] = obj[key]
    }
  });
  return arr;
}

// toArray({
//   0:{
//     s:'sdad'
//   },
//   1:'dsa',
//   a:'rtest'
// })

var rgbToHex = function(rgb) {
	var str = rgb.replace(/rgb\((.+)\)/g,function(match,$1) { return $1; });
	var	arr = str.split(",").map(v=>parseInt(v).toString(16)).map(v=>v.length == 1 ? ('0'+v) : (v));
	
  return `${arr[0]}${arr[1]}${arr[2]}`;
}

var getRandomName = function(len = 2) {
	var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';   
　　var maxPos = chars.length;
　　var rand = '';
　for (let i = 0; i < len; i++) {
	  rand += chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return `${rand}${Date.now()}`
}

var ObjectToArray = function(obj) {
	let result;
	if(isObject(obj)) {
		let keys = Object.keys(obj);
		result = keys.reduce((arr,key)=>arr.concat([[key,obj[key]]]),[]);
	}

	return result;
}

var toFormData = function(obj, prefix = false) {
	let result;
	if(isObject(obj)) {
		let arr = ObjectToArray(obj);
		result = arr.map(item=>{
      item[1] = encodeURIComponent(item[1]);
			return item.join("=")
		}).join("&");
		prefix && (result = "?" + result);
	}

	return result;
}

export {
  isArray,
  isObject,
  isFunction,
  toArray,
  rgbToHex,
  getRandomName,
  toFormData,
  
}
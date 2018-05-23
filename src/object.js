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

var toFormData = function(obj,seq1 = '=', seq2 = '&', prefix = false) {
	let result;
	if(isObject(obj)) {
		let arr = ObjectToArray(obj);
		result = arr.map(item=>{
      item[1] = encodeURIComponent(item[1]);
			return item.join(seq1)
		}).join(seq2);
		prefix && (result = "?" + result);
	}

	return result;
}

var strToObject = function(str,seq1 = '&',seq2 = '=') {
	var obj = {};
	var arr1 = str.split(seq1);
	if(Array.isArray(arr1)) {
		arr1.map(_arr1=>{
			var arr2 = _arr1.split(seq2);
			Array.isArray(arr1) && (obj[arr2[0]] = decodeURIComponent(arr2[1]));
		})
	}
	return obj;
}

var validateData = function(data,regs) {
	var obj = null,
			name,
			value,
			reg;
	if(Array.isArray(regs)) {
		for(let i = 0,len =regs.length;i<len;i++) {
			name = regs[i].name;
			value = data[name];
			reg = regs[i].reg;
			if(!value) {
				obj = {
					msg: `${regs[i].field||name}不能为空`,
					error: true
				}
				break;
			} else if(!reg.test(value)) {
				obj = {
					msg: regs[i].msg || `${name}不符合格式`,
					error: true
				}
				break;
			}
		}
	}

	return obj;
}
// validateData({
// 	tel:15512341234
// },[{
// 	name:'tel',
// 	reg: /\d{11}/,
// 	msg:'手机号必须为11位'
// }])

export {
  isArray,
  isObject,
  isFunction,
  toArray,
  rgbToHex,
  getRandomName,
  toFormData,
	strToObject,
	validateData
}
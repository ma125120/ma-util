var insertArray = function(i,data = {},arr) {
  return [...arr.slice(0,i+1),data,...arr.slice(i+1)];
}

export {
  insertArray
}

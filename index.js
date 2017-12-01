function rot13(str) { // LBH QVQ VG!
var shifted = 13;
var splitted = str.split('');
var arr = [];
var inCharCode = splitted.forEach(function(element) {
arr.push(element.charCodeAt(0));
return arr;
});
var shifterArray = arr.map(function(element) {
return element += shifted;
})
var someString = shifterArray.join( );
var res = String.fromCharCode(someString);
var resultArray = shifterArray.map(function (x) {
return parseInt(x, 10);
});
var symbols = resultArray.forEach(function(val) {
return String.fromCharCode(val);
})
return symbols;
}

// Change the inputs below to test
rot13("SERR PBQR PNZC");
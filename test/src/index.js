const test1 = require("./test1/test1.js");

const str = window.location.href.split("/");
if(str[str.length-1] != ""){
	eval(str[str.length-1] + "()");
}
if(str[str.length-2] != ""){
	eval(str[str.length-2] + "()");
}
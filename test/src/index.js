const test1 = require("./test1/test1.js");
const test2 = require("./test2/test2.js");
const test3 = require("./test3/test3.js");
<<<<<<< HEAD
=======
const test4 = require("./test4/test4.js");
const test5 = require("./test5/test5.js");
const test6 = require("./test6/test6.js");
const test7 = require("./test7/test7.js");
>>>>>>> tmp

const str = window.location.href.split("/");
if(str[str.length-1] != ""){
	eval(str[str.length-1] + "()");
} else if(str[str.length-2] != "" && str[str.length-2] != "localhost:3000"){
	eval(str[str.length-2] + "()");
}
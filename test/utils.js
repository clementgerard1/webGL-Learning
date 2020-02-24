module.exports = {

	error : function (message){
		console.log('\x1b[31m', message, '\x1b[30m');
	},

	success : function (message){
		console.log('\x1b[32m', message, '\x1b[30m');
	}

};
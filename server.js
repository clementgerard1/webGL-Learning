const express = require('express');
const app = express();

if(process.argv[2] == "dev"){
 
	app.get('/', function (req, res) {
	  res.sendFile(__dirname + "/dev/index.html");
	})

	app.get('/:url',function(req,res){
		if(req.params.url != "favicon.ico"){
	    res.sendFile(__dirname + '/dev/' + req.params.url);
		}else{
			res.send(null);
		}
	});
	 
	app.listen(3000);
	console.log('\x1b[32m', "SERVER STARTED ON PORT 3000, DEV MODE...", '\x1b[30m');

}else{

	app.get('/', function (req, res) {
	  res.sendFile(__dirname + "/dist/index.html");
	})

	app.get('/:url',function(req,res){
		if(req.params.url != "favicon.ico"){
	    res.sendFile(__dirname + '/dist/' + req.params.url);
		}else{
			res.send(null);
		}
	});
	 
	app.listen(80);
	console.log('\x1b[32m', "SERVER STARTED ON STANDART PORT 80, PROD MODE...", '\x1b[30m');

}
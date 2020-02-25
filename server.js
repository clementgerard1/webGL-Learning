const express = require('express');
const app = express();
 
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
})

app.get('/:url',function(req,res){
	if(req.params.url != "favicon.ico"){
    res.sendFile(__dirname + '/public/' + req.params.url);
	}else{
		res.send(null);
	}
});

app.get('/shaders/:url',function(req,res){
	console.log("bonjour");
  res.sendFile(__dirname + '/public/shaders/' + req.params.url);
});
 
app.listen(3000);
console.log('\x1b[32m', "SERVER STARTED ON PORT 3000...", '\x1b[30m');
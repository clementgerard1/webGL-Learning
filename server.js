const express = require('express');
const app = express();
 
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
})

app.get('/:url',function(req,res){
    res.sendFile(__dirname + '/public/' + req.params.url);
});
 
app.listen(3000);
var express = require('express');

var app = express();

var port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/../client'));

app.listen(port, function(err) {
  if(err){
    return console.log(err);
  } else {
    console.log('Listening on Port: ' + port);
  }
});
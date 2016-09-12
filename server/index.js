var express = require('express');
// var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/../client'));

// app.use(bodyParser.urlencoded({extended:true}));

// app.use(bodyParser.json());

app.listen(port, function(err) {
  if(err){
    return console.log(err);
  } else {
    console.log('Listening on Port: ' + port);
  }
});
var express = require('express');
var app = express();
const classifier = require('./src/classifier');


app.get('/', function(req, res){
   res.send(classifier);
});


app.listen(3000,()=>console.log('running!!'));

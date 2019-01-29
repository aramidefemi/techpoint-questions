var express = require('express');
var app = express();
const classifier = require('./src/classifier');
const  morse = require('./src/morse');

app.get('/classifier', function(req, res){
   res.send(classifier);
});
app.get('/morse', function(req, res){
   res.send(morse);
});


app.listen(3000,()=>console.log('running!!'));

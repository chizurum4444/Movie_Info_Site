var express = require('express');
var http = require('http');
var url = require('url');
var fs = require('fs');
var app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));


var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});

app.get('/', function(request, response) {
  response.redirect('/showtimes_api')
});

app.get('/movie', function(request, response) {
  response.sendFile('movie.html', {root: __dirname + "/public/"});
});
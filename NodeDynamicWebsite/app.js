//Problem: Look at users badge count and points from the browser

//Solution: Import data using Node.js and serve http templates
var router = require('./router.js');
var http = require('http');
var https = require('https');


//1. Create a web server
http.createServer(function(req,res){
	router.home(req,res);
	router.user(req,res);
}).listen(7357);
console.log("Server running at localhost:7357")




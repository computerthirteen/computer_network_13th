
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var fs = require('fs');
var path = require('path');

app.set('port', 3000);
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

app.start = app.listen = app.aaa = function(){
	return server.listen.apply(server, arguments)
}
app.aaa(app.get('port'),function(){
	console.log("Server Start");
});
function include(file_) {
	with (global) {
		eval(fs.readFileSync(file_) + '');
	};
};
include(__dirname + "/config/include.js")
for(var i = 0 ; i < servicefile.length ; i++){
	include(__dirname + "/service/" + servicefile[i] );
}
app.all('*', function(req, res, next){
	next();
});
 

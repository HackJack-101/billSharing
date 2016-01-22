'use strict';

// Start database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Jack3113_billSharing', function (err) {
	if (err) {
		throw err;
	}
});

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

require('./routes')(app);

app.use(express.static(__dirname + "/../client"));

// Start server
var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Server listening at http://%s:%s', host, port);
});

// Expose app
exports = module.exports = app;
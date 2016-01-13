'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(express.static("client"));
app.use("/bower_components", express.static("bower_components"));
app.use("/js", express.static("js"));
app.use("/design", express.static("design"));
app.use("/assets", express.static("assets"));
app.use("/partials", express.static("partials"));

// Start server
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server listening at http://%s:%s', host, port);
});
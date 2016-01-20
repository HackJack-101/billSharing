'use strict';

var Group = require('./group.model');
var Bill = require('./../bill/bill.model');

exports.get = function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	Group.findById(req.params.id, function (err, data) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(JSON.stringify(data));
		}
	});
};

exports.getBills = function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	Bill.find({group: req.params.id}, function (err, data) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(JSON.stringify(data));
		}
	});
};

exports.getAll = function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	Group.find(function (err, data) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(JSON.stringify(data));
		}
	});
};

exports.add = function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	var newGroup = new Group(req.body);
	newGroup.save(function (err) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(req.body);
		}
	});
};

exports.edit = function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	Group.update({
		_id: req.params.id
	}, req.body, function (err) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(JSON.stringify(req.body));
		}
	});
};

exports.delete = function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	Group.remove({
		_id: req.params.id
	}, function (err, data) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(JSON.stringify(data));
		}
	});
};
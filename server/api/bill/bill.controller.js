'use strict';

var Bill = require('./bill.model');

exports.get = function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	Bill.findById(req.params.id, function (err, data) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(JSON.stringify(data));
		}
	});
};

exports.getAll = function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	Bill.find(function (err, data) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(JSON.stringify(data));
		}
	});
};

exports.add = function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	var newBill = new Bill(req.body);
	newBill.save(function (err) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(req.body);
		}
	});
};

exports.edit = function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	Bill.update({
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
	Bill.remove({
		_id: req.params.id
	}, function (err, data) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(JSON.stringify(data));
		}
	});
};
'use strict';

var Payment = require('./payment.model');

exports.get = function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	Payment.findById(req.params.id, function (err, data) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(JSON.stringify(data));
		}
	});
};

exports.getAll = function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	Payment.find(function (err, data) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(JSON.stringify(data));
		}
	});
};

exports.add = function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	var newPayment = new Payment(req.body);
	newPayment.save(function (err) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(req.body);
		}
	});
};

exports.edit = function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	Payment.update({
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
	Payment.remove({
		_id: req.params.id
	}, function (err, data) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(JSON.stringify(data));
		}
	});
};
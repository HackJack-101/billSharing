'use strict';

var User = require('./user.model');
var Group = require('./../group/group.model');
var Payment = require('./../payment/payment.model');

exports.get = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    User.findById(req.params.id, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(JSON.stringify(data));
        }
    });
};

exports.getAll = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    User.find(function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(JSON.stringify(data));
        }
    });
};

exports.login = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    User.find({email: req.body.email, password: req.body.password}, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(JSON.stringify(data));
        }
    });
};

exports.getGroupsByUserId = function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	Group.find({friends: req.params.id}, function (err, data) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(JSON.stringify(data));
		}
	});
};

exports.getPaymentsByUserId = function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	//TODO change find, it's not only "from:"
	Payment.find({from: req.params.id}, function (err, data) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(JSON.stringify(data));
		}
	});
};

exports.add = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var newUser = new User(req.body);
    newUser.save(function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(req.body);
        }
    });
};

exports.edit = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    User.update({
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
    User.remove({
        _id: req.params.id
    }, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(JSON.stringify(data));
        }
    });
};
'use strict';

var mongoose = require('mongoose');

var PaymentSchema = new mongoose.Schema({
	description: String,
	from: String,
	to: String,
	group: String,
	currency: String,
	value: Number,
	updated: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Payment", PaymentSchema);
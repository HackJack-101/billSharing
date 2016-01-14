'use strict';

var mongoose = require('mongoose');

var BillSchema = new mongoose.Schema({
	name: String,
	description: String,
	owner: String,
	group: String,
        currency: String,
        value: Number,
	updated: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Bill", BillSchema);
'use strict';

var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
	name: String,
	users: [String],
	updated: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Group", GroupSchema);
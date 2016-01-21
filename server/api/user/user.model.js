'use strict';

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    password: String,
    friends: [String],
    updated: {type: Date, default: Date.now}
});

module.exports = mongoose.model("User", UserSchema);
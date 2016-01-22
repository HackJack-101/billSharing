'use strict';
module.exports = function (app) {
	app.use('/api/user', require('./api/user'));
	app.use('/api/bill', require('./api/bill'));
	app.use('/api/group', require('./api/group'));
	app.use('/api/payment', require('./api/payment'));
};
'use strict';
module.exports = function (app) {
	app.use('/user', require('./api/user'));
	app.use('/bill', require('./api/bill'));
	app.use('/group', require('./api/group'));
	app.use('/payment', require('./api/payment'));
};
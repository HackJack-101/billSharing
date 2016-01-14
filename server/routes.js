'use strict';
module.exports = function (app) {
	'use strict';

	app.use('/user', require('./api/user'));
	app.use('/bill', require('./api/bill'));
	app.use('/group', require('./api/group'));
};
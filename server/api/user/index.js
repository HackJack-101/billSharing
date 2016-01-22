'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.post('/email', controller.getByEmail);
router.get('/:id/paymentsReceived', controller.getPaymentsReceived);
router.get('/:id/payments', controller.getPayments);
router.get('/:id/billsPaid', controller.getBillsPaid);
router.get('/:id/groups', controller.getGroups);
router.post('/login', controller.login);
router.post('/', controller.add);
router.put('/:id', controller.edit);
router.delete('/:id', controller.delete);

module.exports = router;
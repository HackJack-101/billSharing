'use strict';

var express = require('express');
var controller = require('./group.controller');

var router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.get('/:id/bills', controller.getBills);
router.get('/:id/payments', controller.getPayments);
router.get('/:id/user/:userID/bills', controller.getBillsByUserId);
router.post('/', controller.add);
router.put('/:id', controller.edit);
router.delete('/:id', controller.delete);
		
module.exports = router;
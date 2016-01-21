'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.get('/:id/groups', controller.getUserGroups);
router.post('/', controller.add);
router.post('/login', controller.add);
router.put('/:id', controller.edit);
router.delete('/:id', controller.delete);
		
module.exports = router;
var express = require('express');
var router = express.Router();

let userController = require('../server/controllers/user.controller');

router.get('/', userController.displayList);

router.post('/create', userController.processCreate);

router.post('/edit/:id', userController.processEdit);

router.get('/delete/:id', userController.performDelete);

router.post('/authenticate', userController.authenticateUser);

module.exports = router;

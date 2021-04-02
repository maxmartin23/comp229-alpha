let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


let incidentController = require('../server/controllers/incident.controller');

router.get('/', incidentController.displayList);

router.get('/create',  incidentController.displayCreate);
router.post('/create', incidentController.processCreate);

router.get('/edit/:id',  incidentController.displayEdit);
router.post('/edit/:id', incidentController.processEdit);

router.get('/delete/:id', incidentController.performDelete);

module.exports = router;

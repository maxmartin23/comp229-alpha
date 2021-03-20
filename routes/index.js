var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/create_incident', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/incidentList', function(req, res, next) {
  res.render('incidentList', { title: 'Incident List' });
});

module.exports = router;

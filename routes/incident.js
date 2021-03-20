let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


let Incident = require('../server/models/incident')


router.get('/',  (req, res, next) => {
    Incident.find((err, IncidentLog) => {
        if(err){
            return console.error(err);
        } else{
            res.render('incidentList', {title: 'List of Incidents', IncidentLog: IncidentLog})
            console.log(IncidentLog)
        } 

    });   
});

module.exports = router;
/* 
Controller for the create / edit incident section
Filename: incident.controller.js

Author: Nestor Romero Leon
StudentId: 301133331
March 2020
*/
let express = require("express");
let router = express.Router();

let mongoose = require("mongoose");
let Incident = require("../models/incident");

module.exports.displayList = (req, res, next) => {
  Incident.find((err, IncidentLog) => {
    if (err) {
      return res.json({success: false, msg: "Error listing incidents: " + err});
    } else {
      //console.log(IncidentLog);
      // return res.json({
      //   success: true,
      //   msg: "Incident list returned",
      //   data: IncidentLog,
      // });
      return res.json(IncidentLog);
    }
  });
};

//Controller action for displaying create incident view
module.exports.displayCreate = (req, res, next) => {
  res.render("incident/create", { title: "Create new incident" });
};

//Controller action for processing create action
module.exports.processCreate = (req, res, next) => {
  let newIncident = Incident({
    number: createIncidentNumber(),
    address: req.body.address,
    description: req.body.description,
    priority: req.body.priority,
    status: req.body.status,
    customerInfo: req.body.customerInfo,
    narrative: req.body.narrative,
    resolution: req.body.resolution,
    createDate: new Date(),
  });

  Incident.create(newIncident, (err) => {
    if (err) {
      console.log(err);
      //res.end(err);
      res.json({success: false, msg: err});
    } else {
      res.json({ success: true, msg: "Incident created" });
    }
  });
};

//Controller action for displaying edit incident view
module.exports.displayEdit = (req, res, next) => {
  let id = req.params.id;
  Incident.findById(id, (err, incident) => {
    if (err) {
      console.error(err);
      res.json({success: false, msg: err});
    } else {
      console.log(incident.number);
      res.render("incident/edit", {
        title: "Update incident information",
        incident: incident,
      });
    }
  });
};

//Controller action for processing edit action
module.exports.processEdit = (req, res, next) => {
  let id = req.params.id;

  let incident = Incident({
    _id: id,
    number: req.body.number,
    address: req.body.address,
    description: req.body.description,
    priority: req.body.priority,
    status: req.body.status,
    customerInfo: req.body.customerInfo,
    narrative: req.body.narrative,
    resolution: req.body.resolution,
  });

  Incident.updateOne({ _id: id }, incident, (err) => {
    if (err) {
      console.log(err);
      res.json({success: false, msg: err});
    } else {
      res.json({ success: true, msg: "Incident updated" });
    }
  });
};

//Controller action for delete incident view
module.exports.performDelete = (req, res, next) => {
  let id = req.params.id;

  Incident.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.json({ success: true, msg: "Incident deleted" });
    }
  });
};

/**
 * Function for creating a new record number structure
 * based on current date and time
 */
function createIncidentNumber() {
  //TODO: To assign the correct number we need the total number of cases today
  //TODO: Create the timestamp structure for status and modifications trailing for management
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();
  let millis = currentDate.getMilliseconds();

  let result =
    year +
    "" +
    month +
    "" +
    day +
    "-" +
    hours +
    "" +
    minutes +
    "" +
    seconds +
    "" +
    millis;
  return result;
}

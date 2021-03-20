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
      res.end(err);
    } else {
      //Redirect to incident dashboard
      res.redirect("/incidentLog");
    }
  });
};

//Controller action for displaying edit incident view
module.exports.displayEdit = (req, res, next) => {
  let id = req.params.id;
  Incident.findById(id, (err, incident) => {
    if (err) {
      console.error(err);
      res.end(err);
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
      res.end(err);
    } else {
      res.redirect("/incidentLog");
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

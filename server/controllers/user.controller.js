let express = require("express");
let router = express.Router();

let mongoose = require("mongoose");
let User = require("../models/user");

module.exports.displayList = (req, res, next) => {
  User.find((err, UserList) => {
    if (err) {
      return res.json({success: false, msg: "Error listing users: " + err});
    } else {
      return res.json(UserList);
    }
  });
};

//Controller action for processing create action
module.exports.processCreate = (req, res, next) => {
  let newUser = User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    type: req.body.type,
  });

  User.create(newUser, (err) => {
    if (err) {
      console.log(err);
      //res.end(err);
      res.json({success: false, msg: err});
    } else {
      res.json({ success: true, msg: "User created" });
    }
  });
};

//Controller action for processing edit action
module.exports.processEdit = (req, res, next) => {
  let id = req.params.id;
  let user = User({
    _id: id,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    type: req.body.type,
  });

  User.updateOne({ _id: id }, user, (err) => {
    if (err) {
      console.log(err);
      res.json({success: false, msg: err});
    } else {
      res.json({ success: true, msg: "User updated" });
    }
  });
};

//Controller action for delete incident view
module.exports.performDelete = (req, res, next) => {
  let id = req.params.id;

  User.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.json({ success: true, msg: "User deleted" });
    }
  });
};


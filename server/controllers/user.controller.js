
let express = require("express");
let router = express.Router();

let mongoose = require("mongoose");
let User = require("../models/user");
let jsonwebtoken = require('jsonwebtoken')

module.exports.displayList = (req, res, next) => {
  User.find((err, UserList) => {
    if (err) {
      return res.json({success: false, msg: "Error listing users: " + err});
    } else {
      return res.json(UserList);
    }
  });
};

module.exports.authenticateUser = (req, res, next) => {
  User.find((err, userList) => {
      if(err)
      {
          return console.error(err);
      }
      else
      {

          auth = false
          let user;
          userList.map(u => {
              if(u.username==req.body.username && u.password==req.body.password){
                  auth = true;
                  user=u;
              }
          })
  const pk = "6e843f3a5c16fa508d63cc4cb73a921be7f4edfaae7ab56162449b7049d0bbd2cc18e46330ce22260fe1719cfb705a1b9703c1f4ec6fbdc89125ce57f0747fd4"
          const token = jsonwebtoken.sign(user?.toString()||'',pk);
          res.send({"message" : auth ? "User is autheticated" : "User isn't authenticated",token});      
      }
  });
}

module.exports.verify = (req, res, next) => {

const pk = "6e843f3a5c16fa508d63cc4cb73a921be7f4edfaae7ab56162449b7049d0bbd2cc18e46330ce22260fe1719cfb705a1b9703c1f4ec6fbdc89125ce57f0747fd4"
        const jw= jwt.verify(authToken,pk)
        console.log(jw)
        return jw
}



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


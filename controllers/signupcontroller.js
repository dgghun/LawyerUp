var pwdhash = require("../libs/bcrypt");
var crud = require("./crud");

exports.signupClient = function(req, res, next) {
  var userDict = {
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    phoneNumber: req.body.phonenumber,
    country: req.body.country,
    email: req.body.email,
    password: pwdhash.generateHash(req.body.password)
  };

  crud.db_createUser("client", userDict)
    .then(user => {
      res.render("landing");
    })
    .catch(function(err) {
      console.log("Error: signupcontroller/signupClient");
      res.render("landing");
    });
};

exports.signupLawyer = function(req, res, next) {
  var userDict = {
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    phoneNumber: req.body.phonenumber,
    country: req.body.country,
    email: req.body.email,
    password: pwdhash.generateHash(req.body.password)
  };

  crud.db_createUser("lawyer", userDict)
    .then(user => {
      res.render("landing");
    })
    .catch(function(err) {
      console.log("Error: signupcontroller/signupLawyer");
      res.render("landing");
    });
};



var pwdhash = require("../libs/bcrypt");
var crud = require("./crud");

/**
 * Creates a new client user and routes back to landing page for login
 *
 * @param {request} req HTTP Request
 * @param {response} res HTTP Response
 * @param {next} next invokes next route handler
 */
exports.signupClient = function(req, res, next) {
  var userDict = req.body;
  userDict.password = pwdhash.generateHash(userDict.password);
  userDict['isLawyer'] = false;
  userDict['roomKey'] = Math.floor(100000 + Math.random() * 900000);

  // TODO: Need to add proper error handling
  //  The user should be notified if there was an
  //  error and pose some action.
  crud.db_createUser(userDict)
    .then(user => {
      // console.log(userDict);
      res.render("landing");
    })
    .catch(function(err) {
      console.log("Error: signupcontroller/signupClient");
      res.render("landing");
    });
};

/**
 * Creates a new lawyer user and routes back to landing page for login
 *
 * @param {request} req HTTP Request
 * @param {response} res HTTP Response
 * @param {next} next invokes next route handler
 */
exports.signupLawyer = function(req, res, next) {
  var userDict = req.body;
  userDict.password = pwdhash.generateHash(userDict.password);
  userDict['isLawyer'] = true;
  userDict['roomKey'] = Math.floor(100000 + Math.random() * 900000);

  // TODO: Need to add proper error handling
  //  The user should be notified if there was an
  //  error and pose some action.
  crud.db_createUser(userDict)
    .then(user => {
      // console.log(userDict);
      res.render("landing");
    })
    .catch(function(err) {
      console.log("Error: signupcontroller/signupClient");
      res.render("landing");
    });
};

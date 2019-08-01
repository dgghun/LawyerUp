var pwdhash = require("../libs/bcrypt");
var crud = require("./crud");
var login = require('./logincontroller');

/**
 * Creates a new client user and routes back to landing page for login
 *
 * @param {request} req HTTP Request
 * @param {response} res HTTP Response
 * @param {next} next invokes next route handler
 */
exports.signupClient = function(req, res, next) {
  var userDict = Object.assign({}, req.body);
  userDict.password = pwdhash.generateHash(userDict.password);
  userDict['isLawyer'] = false;
  userDict['roomKey'] = Math.floor(100000 + Math.random() * 900000);

  crud.db_createUser(userDict)
    .then(user => {
      // res.render("landing");
      login.login(req, res);
    })
    .catch(function(err) {
      if (err.name == 'SequelizeUniqueConstraintError'){
        res.render('signup_client', {
          err: 'Email address is already in use',
          userInput: {
            country: res.req.body.country,
            email: res.req.body.email,
            firstName: res.req.body.firstName,
            lastName: res.req.body.lastName,
            phoneNumber: res.req.body.phoneNumber
        }});
      }
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

  crud.db_createUser(userDict)
    .then(user => {
      //res.render("landing");
      login.login(req, res);
    })
    .catch(function(err) {
      if (err.name == 'SequelizeUniqueConstraintError'){
        res.render('signup_client', {
          err: 'Email address is already in use',
          userInput: {
            country: res.req.body.country,
            email: res.req.body.email,
            firstName: res.req.body.firstName,
            lastName: res.req.body.lastName,
            phoneNumber: res.req.body.phoneNumber
        }});
      }
    });
};

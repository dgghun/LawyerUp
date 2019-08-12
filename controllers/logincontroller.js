var pwdhash = require("../libs/bcrypt");
var crud = require("./crud");
var lawyerController = require('../controllers/lawyercontroller');

exports.login = function(req, res) {
  crud.db_getUserEmail(req.body)
    .then(user => {
      if (user == null) {
        throw "User not found";
      } else {
        if (pwdhash.compare(req.body.password, user.password)){
          req.session.uid = user.id;
          req.session.firstName = user.firstName;
          req.session.lastName = user.lastName;

          if (user.isLawyer) {
            lawyerController.renderLaywer(res, 'lawyer', user);
          }
          else {
            res.redirect('/user/client');
          }
        }
        else res.render("landing");
      }
    })
    .catch(function(err) {
      console.log('ERROR logincontroller:' + err);
      res.render("landing");
    });
};
var pwdhash = require("../libs/bcrypt");
var crud = require("./crud");

const app_name = "LawyerUp";

exports.get_landing = (req, res, next) => {
  res.render("landing", { title: app_name });
}
exports.client_signup = (req, res, next) => res.render("signup_client");
exports.lawyer_signup = (req, res, next) => res.render("signup_lawyer");

/**
 * Render logout alert, log out and send to landing
 */
exports.logout = function(req, res, next){
  req.session.destroy();  
  res.render('alert', {
    message: req.body.message,
    action: '/'
  });  
};

exports.crud_testing = function(req, res, next) {
  res.render("crud_testing", {
    title: app_name,
    message: "CRUD Testing"
  });
};

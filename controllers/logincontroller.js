var pwdhash = require("../libs/bcrypt");
var crud = require("./crud");

exports.login = function(req, res, next) {
  crud.db_getUserEmail(req.body)
    .then(user => {
      if (user == null) {
        throw "User not found";
      } else {
        if (pwdhash.compare(req.body.password, user.password))
          res.render("client");
        else res.render("landing");
      }
    })
    .catch(function(err) {
      res.render("landing");
    });
};

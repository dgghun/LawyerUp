var pwdhash = require("../libs/bcrypt");
var crud = require("./crud");

exports.login = function(req, res, next) {
  crud.db_getUserEmail(req.body)
    .then(user => {
      if (user == null) {
        throw "User not found";
      } else {
        if (pwdhash.compare(req.body.password, user.password)){
            if(user.isLawyer)
                res.render("lawyer");
            else 
                res.render("client");
        }
        else res.render("landing");
      }
    })
    .catch(function(err) {
      console.log('ERROR logincontroller:' + err);
      res.render("landing");
    });
};

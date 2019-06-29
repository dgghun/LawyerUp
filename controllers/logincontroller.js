var pwdhash = require("../libs/bcrypt");
var crud = require("./crud");

exports.login = function(req, res) {
  crud.db_getUserEmail(req.body)
    .then(user => {
      if (user == null) {
        throw "User not found";
      } else {
        if (pwdhash.compare(req.body.password, user.password)){
          req.session.uid = user.id;
          if (user.isLawyer) {
            res.redirect('/user/lawyer');
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

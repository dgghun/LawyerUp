var pwdhash = require("../libs/bcrypt");
var crud = require("./crud");

exports.login = function(req, res, next) {
  /* TODO: We need to merge client and lawyer tables to => user_tbl
   *    Inner db_getClient call can be removed when table is merged
  */
  crud.db_getClient("client", req.body.email)
    .then(user => {
      //not found in client table
      if (user == null) {
        //check lawyer table
        crud.db_getClient("lawyer", req.body.email).then(user => {
          if (user == null) {
            res.render("landing");
          } else {
            if (pwdhash.compare(req.body.password, user.password)) res.render("lawyer");
            else res.render("landing");
          }
        }); //end check lawywer table
      } else {
        if (pwdhash.compare(req.body.password, user.password)) res.render("client");
        else res.render("landing");
      }
    })
    .catch(function(err) {
      res.render("landing");
    });
};

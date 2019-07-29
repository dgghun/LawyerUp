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
          req.session.firstName = user.firstName;
          req.session.lastName = user.lastName;

          if (user.isLawyer) {
            // res.redirect('/user/lawyer');
            renderLawyerPage(res, 'lawyer', user);
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

function renderLawyerPage(res, page, user){
  var userInfo = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber
  }

  // crud.db_getLegalFields()
  //   .then(fields =>{
  //     fields.forEach(i => {
  //       console.log("LegalField - ID:" + i.id + " Field:" + i.field)
  //     });
  //     // console.log("LegalFields: " + fields)
  //   })
  //   .catch(function(err){
  //     console.log("ERROR: " + err);
  //   });

  res.render(page, userInfo);
}
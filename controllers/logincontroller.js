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

/**
 * Gets checks db for appointments for Lawyer and sends this along with Lawyer info to main Lawyer page
 * @param {*} res
 * @param {*} page
 * @param {*} user
 */
function renderLawyerPage(res, page, user){
  var userInfo;

  crud.db_getLawyerAppointments(user.id)
    .then(appts =>{
      var promises = [];
      appts.forEach(user =>{
        promises.push(crud.db_getUserId(user.clientID)
        .then(client =>{
          //format client before moving on
          client.phoneNumber = formatPhoneNumber(client.phoneNumber);  // format phone

          return client;
        }));
      });
      return Promise.all(promises); //get all appointments and user info before moving on
    })
    .then(clients =>{
      userInfo = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: formatPhoneNumber(user.phoneNumber),
        appointments: clients
      };
      res.render(page, userInfo);
    })
    .catch(function(error){
      console.log('ERROR:' + error);
      userInfo = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: formatPhoneNumber(user.phoneNumber),
        appointments: null
      };
      res.render(page, userInfo);
    });

    /**
     * Formats a Date object
     * @param {Date object} date
     */
    function formatDateTime(date){
      return  date.getMonth() +
              '/' +
              date.getDay() +
              '/' +
              date.getFullYear() +
              ' ' +
              date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    }

    /**
     * Formats a phone number to (xxx) xxx-xxxx
     * @param {String} phoneNumberString
     */
    function formatPhoneNumber(ph) {
      return '(' + ph.substr(0,3) + ')' + ' ' + ph.substr(3,3) + '-' + ph.substr(6,4);
    }

  /**
   * TODO: get legal fields for rendering lawyer page
   */
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

}
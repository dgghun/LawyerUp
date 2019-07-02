var crud = require("./crud");

/**
 * Loads client landing page
 *
 * @param {request} req HTTP Request
 * @param {response} res HTTP Response
 * @param {next} next invokes next route handler
 */
exports.landing = (req, res, next) => {

  //Get list of incidents from DB.
  crud.db_getIncidents()
    .then(id => {
      var results = [];
      id.forEach(element => {
        results.push({ id: element.id, type: element.type });
      });
      res.render("client", {userName: `${req.session.firstName}`, incidents: results });
    })
    .catch(function(err) {
      console.log("Error: Issue fetching Incident ID's");
      res.render("client");
    });
};

/**
 * Redirect to list of lawyers for specific incident
 *
 * @param {request} req HTTP Request - URL holds query info
 * @param {response} res HTTP Response
 * @param {next} next invokes next route handler
 */
exports.findLawyer = (req, res, next) => {
  // TODO: Refactor the logic when DB Foreign Key constrainsts are added.
  //  This function is a hack until the DB (sequelize) is fully wired up wit FK's.
  //  Once wired up the code can be cutdown and cleaned.
  //
  //  Can prob. use iterators in we have to use lists
  //  ...think Promise.all can be used here

  // let suggestedLawyers = [];
  // var fieldId = [];
  // var possibleLawyersId = [];
  crud
    .db_getLegalIncidentMap_IdFK(Number(req.query.incident))
    .then(incidentId => {
      var temp = [];
      incidentId.forEach(element => {
        temp.push(Number([element.fieldID]));
      });
      return temp;
    })
    .then(fieldId => {
      return Promise.all([crud.db_getLawyerProfile_UserIdFk(fieldId)]);
    })
    .then(users => {
      var usersIdList = [];
      users[0].forEach(element => {
        usersIdList.push(Number([element.userID]));
      });
      return Promise.all([crud.db_getUsers(usersIdList)]);
    })
    .then(lawyerId => {
      let suggestedLawyers = [];
      lawyerId[0].forEach(element => {
        suggestedLawyers.push(element);
      });
      res.send(suggestedLawyers);
    })
    .catch(function(err) {
      console.log("Error: Could not determine lawyer suggestions");
    });
};


exports.requestAppointment = (req, res, next) => {
  //TODO: Currently there's only 'hackish' methods to get
  //  the clients id. Need to add in cookies/sessions
  //  to properly fill out the database.

  //Hardcoding userID for now
  crud.db_createAppointment({clientID: 1, lawyerID: req.query.reqid})
  .then(item =>{
    // res.render('client');
    res.redirect(`${res.req.baseUrl}/client`);
    // res.redirect('/');
  })
  .catch(function(err){
    res.render('client');
  });

};

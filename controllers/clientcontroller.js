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
  crud
    .db_getIncidents()
    .then(id => {
      var results = [];
      id.forEach(element => {
        results.push({ id: element.id, type: element.type });
      });
      res.render("client", {
        userName: `${req.session.firstName}`,
        incidents: results
      });
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

/**
 * Initates the clients request to create a appointment with a lawyer
 *
 * @param {request} req HTTP Request - URL holds query info, Session hold client info
 * @param {response} res HTTP Response
 * @param {next} next invokes next route handler
 */
exports.requestAppointment = (req, res, next) => {
  var appointment = {
    'clientID': '',
    'clientRoomKey': '',
    'lawyerID': '',
    'lawyerRoomKey': ''
  };

  crud.db_retriveUserID_LawyerIDPK(req.query.reqid)
    .then(lawyerUserID => {
      //fetch userID from lawyerID
      atters = { clientID: req.session.uid, lawyerID: lawyerUserID.id };
      return atters;
    })
    .then(usersUID => {
      //fetches both client and user data
      return Promise.all([crud.db_getUsers([usersUID.clientID, usersUID.lawyerID], profile = 'appointment')]);
    })
    .then(users => {
      if (users[0][0].isLawyer){
        appointment.lawyerID = users[0][0].id;
        appointment.lawyerRoomKey = users[0][0].roomKey;
        appointment.clientID = users[0][1].id;
        appointment.clientRoomKey = users[0][1].roomKey;
      } else {
        appointment.clientID = users[0][0].id;
        appointment.clientRoomKey = users[0][0].roomKey;
        appointment.lawyerID = users[0][1].id;
        appointment.lawyerRoomKey = users[0][1].roomKey;
      }
      crud.db_createAppointment(appointment);
    })
    .then(item => {
      // crud.db_createAppointment({clientID: req.session.uid, lawyerID: userID});
      res.redirect(`${res.req.baseUrl}/client`);
    })
    .catch(function(err) {
      console.log("Error requesting appointment");
      res.render("client");
    });
};

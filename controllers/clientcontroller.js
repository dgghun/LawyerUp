var uuidv4 = require("uuid/v4");
var mkdirp = require("mkdirp");
var fs = require("fs");
var crud = require("./crud");
var apt = require("../libs/appointmentManager");

const CASES_DIR = "./cases/";

/**
 * Loads client incident form with relevent incident categories
 *
 * @param {request} req HTTP Request
 * @param {response} res HTTP Response
 * @param {next} next invokes next route handler
 */
exports.incidentForm = (req, res, next) => {
  //Get list of incidents from DB.
  crud
    .db_getIncidents()
    .then(id => {
      var results = [];
      id.forEach(element => {
        results.push({ id: element.id, type: element.type });
      });
      res.render("client/clientIncidentForm", {
        userName: `${req.session.firstName}`,
        incidents: results
      });
    })
    .catch(function(err) {
      console.log("Error: Issue fetching Incident ID's");
      res.render("client/clientNews");
    });
};

/**
 * Logs client case information into app
 *
 * @param {request} req HTTP Request - URL holds query info, Session hold client info
 * @param {response} res HTTP Response
 * @param {next} next invokes next route handler
 */
exports.incidentFormSubmit = (req, res, next) => {
  let incident_info = {
    uuid: uuidv4(),
    isForClient: req.body.radio_who_for_client == "on" ? "true" : "false",
    arrest: req.body.radio_arrest_true == "on" ? "true" : "false",
    incidentID: req.body.incident,
    clientStory: req.body.clientStory
  };

  ensureExists(CASES_DIR, function(err) {
    //persist client case "incident" information to case file (json)
    fs.writeFile(
      `${CASES_DIR}${incident_info.uuid}.json`,
      JSON.stringify(incident_info),
      err => {
        if (err) {
          //TODO: Add error message in view
          //  The form should reload and allow the user to enter information again
          //  and throw an error message
          res.render("client/clientIncidentForm", {
            err: "Could not save incident information"
          });
        }

        //Lookup lawyers for case type
        crud
          .db_getLegalIncidentMap_IdFK(Number(incident_info.incidentID))
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

            req.session.caseUUID = incident_info.uuid;
            res.render("client/lawyerSearch", {
              lawyerProfiles: suggestedLawyers
            });
          })
          .catch(function(err) {
            console.log("Error: Could not determine lawyer suggestions");
          });
      }
    );
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
 * Fetch relevent news article for user to read
 *
 * @param {request} req HTTP Request - URL holds query info, Session hold client info
 * @param {response} res HTTP Response
 */
exports.fetchNews = (req, res) => {
  //Fetching next apointment so that user can get a notification
  // of upcoming appointment after login
  apt
    .fetchNextAppointment(
      req.path.includes("client") ? "client" : "lawyer",
      req.session.uid
    )
    .then(userAppt => {
      if (userAppt === "empty" || userAppt === null || userAppt.apptDate === null) {
        res.render("client/clientNews");
      }
      else {
        req.session.aptkey = userAppt.clientRoomKey.toString() + userAppt.lawyerRoomKey.toString();
        res.render("client/clientNews", {
          nextAppointment: JSON.stringify(userAppt.apptDate)
        });
      }
    })
    .catch(function(err) {
      console.log("ERROR: Cannot find user appointment");
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
    clientID: "",
    clientRoomKey: "",
    lawyerID: "",
    lawyerRoomKey: "",
    caseUUID: req.session.caseUUID
  };

  crud
    .db_retriveUserID_LawyerIDPK(req.query.reqid)
    .then(lawyerUserID => {
      //fetch userID from lawyerID
      atters = { clientID: req.session.uid, lawyerID: lawyerUserID.id };
      return atters;
    })
    .then(usersUID => {
      //fetches both client and user data
      return Promise.all([
        crud.db_getUsers(
          [usersUID.clientID, usersUID.lawyerID],
          (profile = "appointment")
        )
      ]);
    })
    .then(users => {
      if (users[0][0].isLawyer) {
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

      //TODO: REMOVE THIS LINE
      appointment.apptDate = "2019-08-09 23:59:00";

      crud.db_createAppointment(appointment);
    })
    .then(item => {
      res.render("client/clientNews", {
        status: "success",
        msg: "Appointment request has been made"
      });
    })
    .catch(function(err) {
      res.render("client/clientNews", {
        status: "error",
        msg: "There was an issue requesting the appointment."
      });
    });
};

/**
 * Ensures directory exists before trying to write file to it.
 *
 * @param {string} path Directory path
 * @param {callback} cb function callback
 */
function ensureExists(path, cb) {
  chmod = 0755;

  fs.mkdir(path, chmod, function(err) {
    if (err) {
      if (err.code == "EEXIST") cb(null);
      // ignore the error if the folder already exists
      else cb(err); // something else went wrong
    } else cb(null); // successfully created folder
  });
}

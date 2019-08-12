var crud = require("../controllers/crud");

/**
 * Fetches a users next appointment information
 * @param {string} userUID user id from user table (pulled from session data)
 * @returns {array} JSON arrary containing the users next appointment
 */
exports.fetchNextAppointment = (userType, userUID) => {
  return new Promise(function(resolve, reject) {
    crud
      .db_getAppointments(userType, userUID)
      .then(userAppointments => {
        let apt = nextAppointment(userAppointments);
        resolve(apt);
      })
      .catch(function(err) {
        return null;
      });
  });
};

/**
 * Returns users next appointment based on date
 *
 * @param {array} aptArray JASON array
 * @returns {array} Single item array with users next appointment
 */
function nextAppointment(aptArray) {
  try {
    if (aptArray == null || aptArray.length == 0) throw "empty";
    else return aptArray[0];
  } catch (err) {
    return err;
  }
}

/**
 * returns a room key based on appointment id
 */
exports.getRoomKey = (apptId) =>{
  return crud.db_getAppointment(apptId)
  .then(appt =>{
    var roomKey = "" + appt.clientRoomKey + appt.lawyerRoomKey;
    return roomKey;
  });
}
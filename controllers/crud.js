var db = require("../libs/db");

/**
 * Inserts user into table
 *
 * @param {string} userDict dictonary of user attributes
 * @returns Sequelize user model or NULL
 */
exports.db_createUser = function(userDict) {
  return db.users.create(userDict);
};

/**
 * Gets first matching user in table based on user email address
 *
 * @param {dictonary} userDict user attributes to query {[email: ""]}
 * @returns Sequelize user model or NULL
 */
exports.db_getUserEmail = function(userDict) {
  return db.users.findOne({
    where: { email: userDict.email }
  });
};

/**
 *Gets all incidents from incidents table
 *
 * @returns incidents model
 */
exports.db_getIncidents = function() {
  return db.incidents.findAll();
};

/**
 *Gets all IncidentID(s) (FK) from LegalIncidentMap table.
 *
 * @param {array or integer} incidentId id number(s) to query
 * @returns legalIncidentMap model
 */
exports.db_getLegalIncidentMap_IdFK = function(incidentId) {
  return db.legalIncidentMaps.findAll({
    attributes: ["fieldID"],
    where: { incidentID: incidentId }
  });
};

/**
 *Gets all LayerProfile User ID(s) from LawyerProfile table that match given
 *fieldId(s)
 *
 * @param {array or integer} fieldId
 */
exports.db_getLawyerProfile_UserIdFk = function(fieldId) {
  return db.lawyerLegalProfiles.findAll({
    attributes: ["userID"],
    where: { fieldID: fieldId }
  });
};

/**
 *Gets all users with matching userID
 *
 * @param {number array OR integer} userId user id to query
 * @param {boolean} [basicProfile=true] determines if we should exlude columns
 * @returns user model
 */
exports.db_getUsers = function(userId, basicProfile = true) {
  if (basicProfile) {
    return db.users.findAll({
      where: { id: userId },
      attributes: { exclude: ["password", "roomKey", "createdAt", "updatedAt"] }
    });
  } else {
    //return everything
    return db.users.findAll({
      where: { id: userId }
    });
  }
};

exports.db_createAppointment = function(partyIDs){
  return db.appointments.create(partyIDs);
}
// ----------------------------------------------------------------------------

/**
 * Delete client
 */
exports.db_deleteClient = function(req, res, next) {
  getConnection(); // get a connection
  const Client = getModel(CLIENT); // get model
  console.log(req.body); // print form data
  const id = req.body.id;

  // Delete client
  doDelete(Client, id).then(function(rowsDeleted) {
    if (rowsDeleted == 1) doRender(res, PAGE, "Deleted Successfully!");
    else if (rowsDeleted > 1) {
      console.log("Rows Deleted:" + rowsDeleted);
      doRender(res, PAGE, "More than one row deleted");
    } else doRender(res, PAGE, "ID not found.");
  });
};

/**
 * Delete lawyer
 */
exports.db_deleteLawyer = function(req, res, next) {
  getConnection(); // get a connection
  const Lawyer = getModel(LAWYER); // get model
  console.log(req.body); // print form data
  const id = req.body.id;

  // Delete lawyer
  doDelete(Lawyer, id).then(function(rowsDeleted) {
    if (rowsDeleted == 1) doRender(res, PAGE, "Deleted Successfully!");
    else if (rowsDeleted > 1) {
      console.log("Rows Deleted:" + rowsDeleted);
      doRender(res, PAGE, "More than one row deleted");
    } else doRender(res, PAGE, "ID not found.");
  });
};

/**
 * Update a client
 */
exports.db_updateClient = function(req, res, next) {
  getConnection(); // get a connection
  const Client = getModel(CLIENT); // get model
  console.log(req.body); // print form data
  const id = req.body.id;

  //Update client
  doUpdate(Client, id, req.body).then(function(rowsUpdated) {
    if (rowsUpdated == 1) doRender(res, PAGE, "Updated Successfully!");
    else if (rowsUpdated > 1) {
      console.log("Rows Updated:" + rowsUpdated);
      doRender(res, PAGE, "More than one row updated");
    } else doRender(res, PAGE, "ID not found.");
  });
};

/**
 * Update a lawyer
 */
exports.db_updateLawyer = function(req, res, next) {
  getConnection(); // get a connection
  const Lawyer = getModel(LAWYER); // get model
  console.log(req.body); // print form data
  const id = req.body.id;

  //Update lawyer
  doUpdate(Lawyer, id, req.body).then(function(rowsUpdated) {
    if (rowsUpdated == 1) doRender(res, PAGE, "Updated Successfully!");
    else if (rowsUpdated > 1) {
      console.log("Rows Updated:" + rowsUpdated);
      doRender(res, PAGE, "More than one row updated");
    } else doRender(res, PAGE, "ID not found.");
  });
};

/**
 *
 * @param {Sequelize DB model} Model
 * @param {DB id} id
 */
function doDelete(Model, id) {
  return Model.destroy({
    where: { id: id }
  })
    .then(function(rowsDeleted) {
      return rowsDeleted;
    })
    .catch(function(err) {
      console.error("DELETE ERROR");
      console.error(err);
      return null;
    });
}

/**
 * Update row
 * @param {Sequelize DB Model*} Model
 * @param {DB id} id
 * @param {Json string to update} attributes
 */
function doUpdate(Model, id, attributes) {
  return Model.update(attributes, {
    where: { id: id }
  })
    .then(function(rowsUpdated) {
      return rowsUpdated;
    })
    .catch(function(err) {
      console.error("UPDATE ERROR");
      console.error(err);
      return null;
    });
}

/**
 * Retrieve row
 * @param {Sequelize DB Model} Model
 * @param {MySQL email} email
 */
function doRetrieve(Model, email) {
  return Model.findOne({
    where: { email: email }
  })
    .then(model => {
      return model;
    })
    .catch(function(err) {
      console.error("RETRIEVE ERROR:");
      console.error(err);
      return null;
    });
}

/**
 * Create row
 * @param {Sequelize DB Model} Model
 * @param {JSON string attributes of new model} attributes
 */
function doCreate(Model, attributes) {
  return Model.create(attributes)
    .then(model => {
      return model;
    })
    .catch(function(err) {
      console.error("CREATE ERROR");
      console.error(err);
      return null;
    });
}

/**
 * Does the call back
 * @param {response} res
 * @param {page to render} page
 * @param {message to display} msg
 */
function doRender(res, page, msg) {
  //render page with message
  res.render(page, {
    message: msg
  });
}

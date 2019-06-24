let model =  require('../models/user');

var Sequelize;
var sequelize;
var message;
const PASSWORD = "";  // MySQL connection password

/**
 * Inserts user into table
 *
 * @param {string} userDict 'client' or 'lawyer'
 * @param {string} userDict dictonary of user attributes
 * @returns Sequelize user model or NULL 
 */
exports.db_createUser = function(userDict) {
  getConnection(); // get a connection
  const userModel = getModel();
  return userModel.create(userDict);
};

/**
 * Gets first matching user in table based on user email address
 *
 * @param {dictonary} userDict user attributes to query {[email: ""]}
 * @returns Sequelize user model or NULL
 */
exports.db_getUserEmail = function(userDict){
  getConnection();
  const userModel = getModel();
  return userModel.findOne({
    where: {email: userDict.email}
  });
};
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

/**
 * Returns sequelize model from /models/ directory
 * @returns user model
 */
function getModel() {
  return model(sequelize, Sequelize); //get the model
}

/**
 * Gets a connection to db
 */
function getConnection() {
  Sequelize = require("sequelize");
  sequelize = new Sequelize("lawyerup_db_dev", "root", PASSWORD, {
    host: "localhost",
    port: 3306,
    dialect: "mysql"
  });

  // Checking connection status
  sequelize
    .authenticate()
    .then(function(err) {
      console.log("Connection has been established successfully.");
    })
    .catch(function(err) {
      console.log("Unable to connect to the database:", err);
    });
}

/**
 *
 */
const LawyerModel = require("../models/lawyer_tbl");

var Sequelize;
var sequelize;
var message;
var TITLE = "This is a title";
const CLIENT = "client";
const LAWYER = "lawyer";
const PAGE = "crud_testing"; // render same page for now

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
 * Gets first mathcing user in table based on user email address
 *
 * @param {string} db_table which table to fetch from
 * @param {string} useremail user email address
 * @returns {model} Sequelize model
 *
 *TODO: Rename this method to something more generic
 *    Method handled fetching both 'lawyer' and 'client'
 *    should be renamed something like db_getUser?
 */
exports.db_getClient = function(db_table, useremail) {
  getConnection();
  if (db_table == "client") model = getModel(CLIENT);
  else model = getModel(LAWYER);

  return model.findOne({
    where: { email: useremail }
  });
};

/**
 * Gets a lawyer
 *TODO: Remove this method
 *   Method should be remove because the 'db_getClient'
 *   handles fetching both client and lawyer based on
 *   passed argument
 */
exports.db_getLawyer = function(req, res, next) {
  getConnection(); // get a connection
  const Lawyer = getModel(LAWYER); // get model
  console.log(req.body); // print form data
  const id = req.body.id;

  // Retrieve Lawyer and process if found
  doRetrieve(Lawyer, id).then(function(lawyer) {
    if (lawyer != null)
      doRender(
        res,
        PAGE,
        "Found " +
          lawyer.firstName +
          " " +
          lawyer.lastname +
          ", ID:" +
          lawyer.id +
          ""
      );
    else doRender(res, PAGE, "Lawyer not found :(");
  });
};

/**
 * Inserts new user into table
 */
exports.db_createUser = function(db_table, userDict) {
  getConnection(); // get a connection

  if (db_table == "client") {
    model = getModel(CLIENT); // get model
  } else {
    model = getModel(LAWYER);
  }

  //Currently no difference between client and lawyer tables
  return model.create({
    firstName: userDict["firstName"],
    lastname: userDict["lastName"],
    email: userDict["email"],
    phoneNum: userDict["phoneNumber"],
    country: userDict["country"],
    password: userDict["password"]
  });
};

/**
 * Create a new client
 */
exports.db_createClient = function(db_table) {
  getConnection(); // get a connection
  const Client = getModel(CLIENT); // get model
  console.log(req.body); // print form data

  //Create Client
  doCreate(Client, req.body).then(function(newClient) {
    if (newClient != null)
      doRender(
        res,
        PAGE,
        "Client " +
          newClient.firstName +
          ", ID:" +
          newClient.id +
          " created successfully!"
      );
    else doRender(res, PAGE, "Error creating client!");
  });
};

/**
 * Create a new lawyer
 */
exports.db_createLawyer = function(req, res, next) {
  getConnection(); // get a connection
  const Lawyer = getModel(LAWYER); // get model
  console.log(req.body); // print form data

  //Create Client
  doCreate(Lawyer, req.body).then(function(newLawyer) {
    if (newLawyer != null)
      doRender(
        res,
        PAGE,
        "Lawyer " +
          newLawyer.firstName +
          ", ID:" +
          newLawyer.id +
          " created successfully!"
      );
    else doRender(res, PAGE, "Error creating lawyer!");
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
 * @param {Model type} model
 */
function getModel(model) {
  var model;

  if (model == CLIENT) model = require("../models/client_tbl");
  else if (model == LAWYER) model = require("../models/lawyer_tbl");

  return model(sequelize, Sequelize); //get the model
}

/**
 * Gets a connection to db
 */
function getConnection() {
  Sequelize = require("sequelize");
  sequelize = new Sequelize("lawyerup_db_dev", "root", "password", {
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

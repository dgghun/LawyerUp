/**
 * 
 */
const LawyerModel = require('../models/lawyer_tbl');

var Sequelize;
var sequelize;
var message;
var TITLE = 'This is a title'
const CLIENT = 'client'
const LAWYER = 'lawyer'
const PAGE = 'crud_testing' // render same page for now


/**
 * Delete client
 */
exports.db_deleteClient = function (req, res, next) {

    getConnection()                     // get a connection
    const Client = getModel(CLIENT);    // get model
    console.log(req.body);              // print form data
    const id = req.body.id

    // Delete client
    doDelete(Client, id).then(function(rowsDeleted){
        if (rowsDeleted == 1)
            doRender(res, PAGE, 'Deleted Successfully!');
        else if (rowsDeleted > 1) {
            console.log('Rows Deleted:' + rowsDeleted);
            doRender(res, PAGE, 'More than one row deleted');
        }
        else
            doRender(res, PAGE, 'ID not found.')
    });
}


/**
 * Delete lawyer
 */
exports.db_deleteLawyer = function (req, res, next) {

    getConnection()                     // get a connection
    const Lawyer = getModel(LAWYER);    // get model
    console.log(req.body);              // print form data
    const id = req.body.id

    // Delete lawyer
    doDelete(Lawyer, id).then(function(rowsDeleted){
        if (rowsDeleted == 1)
            doRender(res, PAGE, 'Deleted Successfully!');
        else if (rowsDeleted > 1) {
            console.log('Rows Deleted:' + rowsDeleted);
            doRender(res, PAGE, 'More than one row deleted');
        }
        else
            doRender(res, PAGE, 'ID not found.')
    });
}


/**
 * Update a client
 */
exports.db_updateClient = function(req, res, next){

    getConnection()                     // get a connection
    const Client = getModel(CLIENT);    // get model
    console.log(req.body);              // print form data
    const id = req.body.id;

    //Update client
    doUpdate(Client, id, req.body).then(function(rowsUpdated){
        if (rowsUpdated == 1)
            doRender(res, PAGE, 'Updated Successfully!');
        else if (rowsUpdated > 1) {
            console.log('Rows Updated:' + rowsUpdated);
            doRender(res, PAGE, 'More than one row updated');
        }
        else
            doRender(res, PAGE, 'ID not found.')
    });
}


/**
 * Update a lawyer
 */
exports.db_updateLawyer = function(req, res, next){

    getConnection()                     // get a connection
    const Lawyer = getModel(LAWYER);    // get model
    console.log(req.body);              // print form data
    const id = req.body.id;

    //Update lawyer
    doUpdate(Lawyer, id, req.body).then(function(rowsUpdated){
        if (rowsUpdated == 1)
            doRender(res, PAGE, 'Updated Successfully!');
        else if (rowsUpdated > 1) {
            console.log('Rows Updated:' + rowsUpdated);
            doRender(res, PAGE, 'More than one row updated');
        }
        else
            doRender(res, PAGE, 'ID not found.')
    });
}


/**
 * Gets a client
 */
exports.db_getClient = function(req, res, next){
    
    getConnection()                     // get a connection
    const Client = getModel(CLIENT);    // get model
    console.log(req.body);              // print form data
    const id = req.body.id;
    
    // Retrieve client and process if found
    doRetrieve(Client, id).then(function (client){
        if(client != null)
            doRender(res, PAGE, 'Found ' + client.firstName + ' ' + client.lastname + ', ID:' + client.id + '');
        else
            doRender(res, PAGE, 'Client not found :(');
    })
}


/**
 * Gets a lawyer
 */
exports.db_getLawyer = function(req, res, next){
    
    getConnection()                     // get a connection
    const Lawyer = getModel(LAWYER);    // get model
    console.log(req.body);              // print form data
    const id = req.body.id;
    
    // Retrieve Lawyer and process if found
    doRetrieve(Lawyer, id).then(function (lawyer){
        if(lawyer != null)
            doRender(res, PAGE, 'Found ' + lawyer.firstName + ' ' + lawyer.lastname + ', ID:' + lawyer.id + '');
        else
            doRender(res, PAGE, 'Lawyer not found :(');
    })
}


/**
 * Create a new client
 */
exports.db_createClient = function(req, res, next){
    
    getConnection()                     // get a connection
    const Client = getModel(CLIENT);    // get model
    console.log(req.body);              // print form data

    //Create Client
    doCreate(Client, req.body).then(function(newClient){
        if(newClient != null)
            doRender(res, PAGE, 'Client ' + newClient.firstName + ', ID:' + newClient.id + ' created successfully!');
        else
            doRender(res, PAGE, 'Error creating client!');
    });
}

/**
 * Create a new lawyer
 */
exports.db_createLawyer = function(req, res, next){
    
    getConnection()                     // get a connection
    const Lawyer = getModel(LAWYER);    // get model
    console.log(req.body);              // print form data

    //Create Client
    doCreate(Lawyer, req.body).then(function(newLawyer){
        if(newLawyer != null)
            doRender(res, PAGE, 'Lawyer ' + newLawyer.firstName + ', ID:' + newLawyer.id + ' created successfully!');
        else
            doRender(res, PAGE, 'Error creating lawyer!');
    });
}

/**
 * 
 * @param {Sequelize DB model} Model 
 * @param {DB id} id 
 */
function doDelete(Model, id){
    return Model.destroy({
            where: {id: id}
        })
        .then(function(rowsDeleted){
            return rowsDeleted;
        })
        .catch(function(err){
            console.error('DELETE ERROR');
            console.error(err);
            return null;
        })
}

/**
 * Update row
 * @param {Sequelize DB Model*} Model 
 * @param {DB id} id 
 * @param {Json string to update} attributes 
 */
function doUpdate(Model, id, attributes){

    return Model.update(attributes, {
            where: {id: id}
        })
        .then(function(rowsUpdated){
            return rowsUpdated;
        })
        .catch(function(err){
            console.error('UPDATE ERROR');
            console.error(err);
            return null;
        });
}

/**
 * Retrieve row
 * @param {Sequelize DB Model} Model 
 * @param {MySQL Id} id 
 */
function doRetrieve(Model, id){
    
    return Model.findOne({
            where: { id: id }
        })
        .then(model => {
            return model;
        })
        .catch(function (err) {
            console.error('RETRIEVE ERROR:');
            console.error(err);
            return null;
        })
}

/**
 * Create row
 * @param {Sequelize DB Model} Model 
 * @param {JSON string attributes of new model} attributes 
 */
function doCreate(Model, attributes){

    return Model.create(attributes)
        .then(model =>{
            return model;
        })
        .catch(function(err){
            console.error('CREATE ERROR');
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
function doRender(res, page, msg){
    //render page with message
    res.render(page,{
        message: msg
    });
}

/**
 * Returns sequelize model from /models/ directory 
 * @param {Model type} model 
 */
function getModel(model){
    var model;

    if(model == CLIENT) 
        model = require('../models/client_tbl');
    else if(model == LAWYER) 
        model = require('../models/lawyer_tbl');

    return model(sequelize, Sequelize); //get the model
}

/**
 * Gets a connection to db
 */
function getConnection(){
    Sequelize = require('sequelize');
    sequelize = new Sequelize('lawyerup_db_dev', 'root', null, {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql'
    });

    // Checking connection status
    sequelize.authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    }).catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });
}
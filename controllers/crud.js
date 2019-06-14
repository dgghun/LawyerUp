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
 * Delete model
 */
exports.db_deleteClient = function (req, res, next) {

    getConnection()                     // get a connection
    const Client = getModel(CLIENT);    // get model
    console.log(req.body);              // print form data

    Client.destroy({
        where: { id: req.body.id }
    })
    .then(function (rowsDeleted) {
        console.log('Rows Deleted: ' + rowsDeleted);
        if (rowsDeleted == 1)
            doRender(res, PAGE, 'Deleted Successfully!');
        else if (rowsDeleted > 1) {
            console.log('Rows Deleted:' + rowsDeleted);
            doRender(res, PAGE, 'More than one row deleted');
        }
        else
            doRender(res, PAGE, 'ID not found.')
    })
    .catch(function (err) {
        console.log('Delete Error');
        console.log(err);
        doRender(res, PAGE, 'Delete error :(');
    });
}


/**
 * Update a client
 */
exports.db_updateClient = function(req, res, next){

    getConnection()                     // get a connection
    const Client = getModel(CLIENT);    // get model
    console.log(req.body);              // print form data

    Client.update(req.body,{
            where: { id: req.body.id }
    })
    .then(function (rowsUpdated) {
        console.log('RowsUpdated:' + rowsUpdated);
        if (rowsUpdated == 1)
            doRender(res, PAGE, 'Updated Successfully!');
        else if (rowsUpdated > 1) {
            console.log('Rows Updated:' + rowsUpdated);
            doRender(res, PAGE, 'More than one row updated');
        }
        else
            doRender(res, PAGE, 'ID not found.')
    })
    .catch(function (err) {
        console.log('Update Error');
        console.log(err);
        doRender(res, PAGE, 'Update error :(');
    });
}

/**
 * Gets a client
 */
exports.db_getClient = function(req, res, next){

    getConnection()    // get a connection

    const Client = getModel(CLIENT);    // get model
    console.log(req.body);              // print form data
    const id = req.body.id;

    Client.findOne({ 
        where: {id: id}
    })
    .then(client => {
        doRender(res, PAGE, 'Found ' + client.firstName + ' ' + client.lastname + ', ID:' + client.id + '');
    })
    .catch(function (err) {
        console.log('Error finding client');
        console.log(err);
        doRender(res, PAGE, 'Client not found :(');
    });
}

// function retrieve(Model, id){
//     Model.findOne({
//         where: {id: id}
//     })(model => {

//     })
// }

/**
 * Create a new client
 */
exports.db_createClient = function(req, res, next){

    getConnection()    // get a connection

    const Client = getModel(CLIENT);    // get model
    console.log(req.body);  // print form data

    //Create Client
    Client.create(req.body)
        .then(newClient => {
            doRender(res, PAGE, 'Client ' + newClient.firstName + ', ID:' + newClient.id + ' created successfully!');
        })
        .catch(function (err) {
            console.log('Error creating client.');
            console.log(err);
            doRender(res, PAGE, 'Error creating client!');
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
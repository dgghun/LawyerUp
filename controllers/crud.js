/**
 * 
 */
const LawyerModel = require('../models/lawyer_tbl');

var Sequelize;
var sequelize;
const CLIENT = 'client'
const LAWYER = 'lawyer'

exports.db_createClient = function(req, res, next){
    console.log("db_create() called.");
    getConnection();    // check connection
    
    //Create Client
    const Client = getModel(CLIENT);
    console.log(req.body);
    Client.create(req.body)
    .then(function(err){
        console.log('Client created.')
    })
    .catch(function(err){
        console.log('Error creating client.');
        console.log(err);
    });
    
    //render same page for now
    res.render('crud_testing');
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
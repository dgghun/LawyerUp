exports.db_create = function(req, res, next){
    console.log("db_create() called.");
    
    var Sequelize = require('sequelize');
    const ClientModel = require('../models/client_tbl');
    
    //Setting up the config
    var sequelize = new Sequelize('lawyerup_db_dev', 'root', null, {
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
    
    //Create Client
    const Client = ClientModel(sequelize, Sequelize);
    console.log(req.body);
    Client.create(req.body)
        .then(function(err){
            console.log('Client create.')
        })
        .catch(function(err){
            console.log('Error creating client.');
            console.log(err);
        });

    res.render('crud_testing');
}
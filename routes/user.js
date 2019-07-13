var express = require('express');
var router = express.Router();

var clientController = require('../controllers/clientcontroller');
var {isLoggedIn, userAuth} = require('../middleware/userAuth'); //destructuring assignment ECMA6

//------ User Client Routes ------
router.get('/client', isLoggedIn, clientController.landing);
router.get('/client/findLawyer', isLoggedIn, clientController.findLawyer);
router.get('/client/findLawyer/reqapt', isLoggedIn, clientController.requestAppointment); //request appointment
router.get('/client/incidentForm', isLoggedIn, function(req, res) { res.render('client/clientIncidentForm');});
router.get('/client/mailbox', isLoggedIn, function(req, res) { res.render('client/clientMailbox');});
router.get('/client/cases', isLoggedIn, function(req, res) { res.render('client/clientCases');});
router.get('/client/calendar', isLoggedIn, function(req, res) { res.render('client/clientCalendar');});
router.get('/client/profile', isLoggedIn, function(req, res) { res.render('client/clientProfile');});
router.get('/client/changePassword', isLoggedIn, function(req, res) { res.render('client/clientChangePassword');});
router.get('/client/changeEmail', isLoggedIn, function(req, res) { res.render('client/clientChangeEmail');});


//------ User Lawyer Routes ------
router.get('/lawyer', function(req, res, next){
    res.render('lawyer');
});

module.exports = router;

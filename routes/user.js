var express = require('express');
var router = express.Router();

var clientController = require('../controllers/clientcontroller');
var {isLoggedIn} = require('../middleware/userAuth'); //destructuring assignment ECMA6

//------ User Client Routes ------
router.get('/client', isLoggedIn, clientController.fetchNews);
router.get('/client/incidentForm', isLoggedIn, clientController.incidentForm);
router.get('/client/lawyerSearch', isLoggedIn, function(req, res) { res.render('client/lawyerSearch');});
router.get('/client/mailbox', isLoggedIn, function(req, res) { res.render('client/clientMailbox');});
router.get('/client/cases', isLoggedIn, clientController.clientCases);
router.get('/client/calendar', isLoggedIn, function(req, res) { res.render('client/clientCalendar');});
router.get('/client/profile', isLoggedIn, function(req, res) { res.render('client/clientProfile');});
router.get('/client/changePassword', isLoggedIn, function(req, res) { res.render('client/clientChangePassword');});
router.get('/client/changeEmail', isLoggedIn, function(req, res) { res.render('client/clientChangeEmail');});
router.get('/client/requestAppointment', isLoggedIn, clientController.requestAppointment);

router.post('/client/incidentFormSubmit', isLoggedIn, clientController.incidentFormSubmit);
router.post('/client/incidentFormUpdate', isLoggedIn, clientController.incidentFormUpdate);


//------ User Lawyer Routes ------
router.get('/lawyer', function(req, res, next){
    res.render('lawyer');
});

module.exports = router;

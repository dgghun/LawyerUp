var express = require('express');
var router = express.Router();

var clientController = require('../controllers/clientcontroller');
var {isLoggedIn, userAuth} = require('../middleware/userAuth'); //destructuring assignment ECMA6

//------ User Client Routes ------
// router.get('/client', isLoggedIn, clientController.landing);
// router.get('/client/findLawyer', isLoggedIn, clientController.findLawyer);
// router.get('/client/findLawyer/reqapt', isLoggedIn, clientController.requestAppointment); //request appointment
router.get('/client', clientController.landing);
router.get('/client/findLawyer', clientController.findLawyer);
router.get('/client/findLawyer/reqapt', clientController.requestAppointment); //request appointment

//------ User Lawyer Routes ------
router.get('/lawyer', function(req, res, next){
    res.render('lawyer');
});

module.exports = router;
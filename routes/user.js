var express = require('express');
var router = express.Router();

var clientController = require('../controllers/clientcontroller');
let {isLoggedIn, userAuth} = require('../middleware/userAuth'); //destructuring assignment ECMA6

//------ User Client Routes ------
router.get('/client', isLoggedIn, clientController.landing);
router.get('/client/findLawyer', isLoggedIn, clientController.findLawyer);
router.get('/client/findLawyer/reqapt', isLoggedIn, clientController.requestAppointment);

//------ User Lawyer Routes ------
router.get('/lawyer', function(req, res, next){
    res.render('lawyer');
});

module.exports = router;
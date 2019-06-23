var express = require('express');
var router = express.Router();

var clientController = require('../controllers/clientcontroller');

//------ User Client Routes ------
router.get('/client', clientController.landing);
router.get('/client/findLawyer', clientController.findLawyer);
router.get('/client/findLawyer/reqapt', clientController.requestAppointment);

//------ User Lawyer Routes ------
router.get('/lawyer', function(req, res, next){
    res.render('lawyer');
});

module.exports = router;
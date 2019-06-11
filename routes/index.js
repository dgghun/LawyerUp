var express = require('express');
var router = express.Router();

/* GET home page. */

let landing = require('../controllers/landing');

router.get('/', landing.get_landing);
router.get('/login', landing.login);
router.get('/clientSignup', landing.client_signup);
router.get('/lawyerSignup', landing.lawyer_signup);
router.get('/CRUD', landing.crud_testing);

// CRUD calls
let crud = require('../controllers/crud');
router.post('/createClient', crud.db_createClient);
router.post('/createLawyer', crud.db_createLawyer);
router.post('/getClient', crud.db_getClient);
router.post('/getLawyer', crud.db_getLawyer);
router.post('/updateClient', crud.db_updateClient);
router.post('/updateLawyer', crud.db_updateLawyer);
router.post('/deleteClient', crud.db_deleteClient);
router.post('/deleteLawyer', crud.db_deleteLawyer);

module.exports = router;

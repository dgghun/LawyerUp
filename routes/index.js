var express = require('express');
var router = express.Router();

/* GET home page. */

let landing = require('../controllers/landing');

router.get('/', landing.get_landing);

router.post('/login', landing.login);
router.post('/clientSignup', landing.client_signup);
router.post('/lawyerSignup', landing.lawyer_signup);
router.post('/CRUD', landing.crud_testing);

// CRUD calls
let crud = require('../controllers/crud');
router.post('/createClient', crud.db_createClient);
router.post('/getClient', crud.db_getClient);
router.post('/updateClient', crud.db_updateClient);
router.post('/deleteClient', crud.db_deleteClient);

module.exports = router;

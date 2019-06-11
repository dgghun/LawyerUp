var express = require('express');
var router = express.Router();

/* GET home page. */

let landing = require('../controllers/landing');

router.get('/', landing.get_landing);

router.get('/login', landing.login);
router.get('/clientSignup', landing.client_signup);
router.get('/lawyerSignup', landing.lawyer_signup);


module.exports = router;

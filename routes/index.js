var express = require('express');
var router = express.Router();

/* GET home page. */

let landing = require('../controllers/landing');

router.get('/', landing.get_landing);

router.post('/login', landing.login);
router.post('/clientSignup', landing.client_signup);
router.post('/lawyerSignup', landing.lawyer_signup);


module.exports = router;

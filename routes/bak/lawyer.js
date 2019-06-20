
var express = require('express');
var router = express.Router();

/* GET client page */
let client = require('../controllers/client');

router.get('/client', client.get_client);

module.exports = router;

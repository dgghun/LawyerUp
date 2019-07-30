var express = require("express");
var router = express.Router();

/* GET home page. */
let landing = require("../controllers/landing");
let loginController = require("../controllers/logincontroller");
let signupController = require("../controllers/signupcontroller");
let videoController = require('../controllers/videocontroller');


router.get("/", landing.get_landing);
router.get("/blog-single", function(req,res, next){
    res.render('blog/blog-single');
});

router.get("/clientsignup", landing.client_signup); //client signup page
router.get("/lawyersignup", landing.lawyer_signup); //lawyer signup page

router.post("/", landing.get_landing);
router.post("/logout", landing.logout);
router.post("/login", loginController.login);
router.post("/clientsignup", signupController.signupClient); //client information submit
router.post("/lawyersignup", signupController.signupLawyer); //lawyer information submit

//------ Video Chat Routes ------
router.post('/launchVideo', videoController.launchVideo);

module.exports = router;

var crud = require("./crud");
var tokenGenerator = require('../libs/generateToken');

exports.launchVideo = function(req, res){

    
    try {
        var token = tokenGenerator.getToken("", "", req.session.firstName, 1800, "");
        var userInfo = {
            token: token,
            name: req.session.firstName,
            room: 'room123'
        }
        console.log("videoController - UserInfo:" + JSON.stringify(userInfo));
        res.render('videochat', userInfo);
    } catch (error) {
        console.error('ERROR MAKING TOKEN: ' + error);
    }
};



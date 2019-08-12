var apt = require('../libs/appointmentManager');
var tokenGenerator = require("../libs/generateToken");

exports.launchVideo = function(req, res) {
  //used for the way client is calling launchVideo
  if (req.session.aptkey){
    try {
      var token = tokenGenerator.getToken("", "", req.session.firstName, 1800, "");
      var userInfo = {
        token: token,
        name: req.session.firstName,
        room: req.session.aptkey
      };
      console.log("videoController - UserInfo:" + JSON.stringify(userInfo));
      res.render("videochat", userInfo);
    } catch (error) {
      console.error("ERROR MAKING TOKEN: " + error);
    }
  }
  //used for the way lawyer UI is calling launchVideo
  else{
    apt.getRoomKey(req.body.apptId)
      .then(roomKey => {
        var token = tokenGenerator.getToken("", "", req.session.firstName, 1800, "");
        var userInfo = {
          token: token,
          name: req.session.firstName,
          room: roomKey
        };
        console.log("videoController - UserInfo:" + JSON.stringify(userInfo));
        res.render("videochat", userInfo);
      })
      .catch(function (err) {
        console.error("ERROR MAKING TOKEN: " + error);
      });
  }
};

let bcrypt = require('bcrypt');


exports.generateHash =


exports.generateHash = function (password) {
    console.log('stub: libs.bcrypt.generateHash');
    return password;
};

exports.compare = function(pwd1, pwd2,){
    console.log('stub: libs.bcrypt.generateHash');
    return true;
};
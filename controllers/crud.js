exports.db_create = function(req, res, next){
    console.log("MESSAGE: db_create() called.");
    console.log(JSON.stringify(req.body));
    
    var userInfo = JSON.stringify(req.body);
    console.log(userInfo.firsName);
    console.log(userInfo.lastName);
    console.log(userInfo.email);
    console.log(userInfo.phone);
    console.log(userInfo.country);
    console.log(userInfo.password);

    res.render('crud_testing');
}
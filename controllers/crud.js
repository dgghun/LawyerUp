exports.db_create = function(req, res, next){
    console.log("MESSAGE: db_create() called.");
    // console.log(JSON.stringify(req.body));
    
    console.log("---> FirstName:" + req.body.firstName);
    console.log("---> LastName: " + req.body.lastName);
    console.log("---> Email:    " + req.body.email);
    console.log("---> Phone:    " + req.body.phone);
    console.log("---> Country:  " + req.body.country);
    console.log("---> Password: " + req.body.password);

    res.render('crud_testing');
}
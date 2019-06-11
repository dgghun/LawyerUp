exports.db_create = function(req, res, next){
    console.log("stub: db_create() called");
    console.log(JSON.stringify(req.body));
    res.render('crud_testing');
}
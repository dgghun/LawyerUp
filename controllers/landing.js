const app_name = 'LawyerUp';

exports.get_landing = function(req, res, next) {
    res.render('landing', {title: app_name})
}

exports.login = function(req, res, next){
    console.log("stub: landing.js -> login function");
    console.log("\n")

    //TODO - Create redirect logic for client vs lawyer.

    //Desired output -  Redirect to client if client login
    //  redirect to lawyer if lawyer login.

    res.render('login');
}

exports.client_signup = function(req, res, next){
    console.log("stub: landing.js -> client_signup");
    console.log("\n")
    
    res.render('client');
}


exports.lawyer_signup = function(req, res, next){
    console.log("stub: landing.js -> lawyer_signup");
    console.log("\n")

    res.render('lawyer');
}

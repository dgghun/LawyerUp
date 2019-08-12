var crud = require("./crud");
var moment = require('moment');

var APPT_NOTREADY = 0;
var APPT_PAST = -1;
var APPT_READY = 1;

exports.getLegalFields = (req, res, next) =>{
    console.log(crud.db_getLegalFields)
}


/**
 * Updateds the DB depending on Accept or decline of an appointment
 */
exports.acceptAppt = (req, res, next) =>{

    crud.db_getAppointment(req.body.apptId)
    .then(appt =>{
        if(req.body.submitAppt == 'accept'){
            appt.apptAccepted = true;
            appt.apptDate = req.body.date + ' ' + req.body.time;
        }else
        appt.apptAccepted = false;
        
        return crud.db_updateAppointment(appt);
    })
    .then(updatedAppt =>{
        return crud.db_getUserId(req.session.uid);
    })
    .then(user =>{
        if (user == null) {
            throw "User not found";
        } else {
            this.renderLaywer(res, 'lawyer', user);
        }
    })
    .catch(function(error){
        console.log('ERROR lawyerController:' + error);
        res.render("landing");
    });
}

/**
 * Gets checks db for appointments for Lawyer and sends this along with Lawyer info to main Lawyer page
 * @param {*} res
 * @param {*} page
 * @param {*} user
 */
exports.renderLaywer = (res, page, user) =>{
    var userInfo;
    console.log('lawywerController: rendering lawyer page...')
    crud.db_getLawyerAppointments(user.id)
        .then(appts => {
            var promises = [];
            appts.forEach(appt => {
                promises.push(crud.db_getUserId(appt.clientID)
                    .then(client => {
                        //format client before moving on
                        client.phoneNumber = formatPhoneNumber(client.phoneNumber);  // format phone
                        client.apptId = appt.id;
                        client.apptAccepted = appt.apptAccepted;
                        client.apptDate = formatDateTime(appt.apptDate);
                        client.apptReady = APPT_NOTREADY;
                        
                        //check for appointment dates/times for setting video button
                        if(appt.apptDate != null){
                            var timeToAppt = (appt.apptDate - new Date()) / 1000 / 3600;    // hours until or past appointment
                            if(timeToAppt <= -1){    //hour has past
                                console.log('--> An hour or more has past since appt time :(')
                                client.apptReady = APPT_PAST;
                            }
                            else if(timeToAppt >= -1 && timeToAppt <= 0){
                                console.log('--> An hour within appt time!')
                                client.apptReady = APPT_READY;
                            }
                            else{
                                console.log('--> Not time for your appt yet...')
                                client.apptReady = APPT_NOTREADY; 
                            }
                        }

                        return client;
                    }));
            });
            return Promise.all(promises); //get all appointments and user info before moving on
        })
        .then(clients => {
            userInfo = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: formatPhoneNumber(user.phoneNumber),
                appointments: clients
            };
            res.render(page, userInfo);
        })
        .catch(function (error) {
            console.log('ERROR:' + error);
            userInfo = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: formatPhoneNumber(user.phoneNumber),
                appointments: null
            };
            res.render(page, userInfo);
        });



    /**
     * TODO: get legal fields for rendering lawyer page
     */
    // crud.db_getLegalFields()
    //   .then(fields =>{
    //     fields.forEach(i => {
    //       console.log("LegalField - ID:" + i.id + " Field:" + i.field)
    //     });
    //     // console.log("LegalFields: " + fields)
    //   })
    //   .catch(function(err){
    //     console.log("ERROR: " + err);
    //   });

}

/**
 * Formats a phone number to (xxx) xxx-xxxx
 * @param {String} phoneNumberString
 */
function formatPhoneNumber(ph) {
    return '(' + ph.substr(0, 3) + ')' + ' ' + ph.substr(3, 3) + '-' + ph.substr(6, 4);
}

                
/**
 * Formats a Date object
 * @param {Date object} date
 */
function formatDateTime(date) {
    if(date == null) return null;

    return moment(date).format('MM/DD/YY LT');
}
var crud = require("./crud");

exports.getLegalFields = (req, res, next) =>{
    console.log(crud.db_getLegalFields)
}

exports.acceptAppointment = (req, res, next) =>{

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
            appts.forEach(user => {
                promises.push(crud.db_getUserId(user.clientID)
                    .then(client => {
                        //format client before moving on
                        client.phoneNumber = formatPhoneNumber(client.phoneNumber);  // format phone

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
    return date.getMonth() +
        '/' +
        date.getDay() +
        '/' +
        date.getFullYear() +
        ' ' +
        date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}
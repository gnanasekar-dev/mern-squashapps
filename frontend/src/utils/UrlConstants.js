var Globals = require('./Globals');

var baseUrl = Globals.ENVIRONMENT[Globals.ENVIRONMENT.ENV].BACKEND_BASE_URL;

module.exports = {

    /* ENVIRONMENT */
    URLS: {

        registerCustomer: baseUrl + 'Customer/webSignUp/',
        confirmRegisterCustomer: baseUrl + 'Customer/webSignUpConfirm/',
        loginCustomer: baseUrl + 'Customer/webLogin/',

        /* Post Register */
        postSignUpOne: baseUrl + 'Customer/webPostSignUpOne/',
        postSignUpTwo: baseUrl + 'Customer/webPostSignUpTwo/',
        /* End of Post Register */

        /* Dashboard / Announcements */
        getAnnouncements: baseUrl + 'Announcement/getAnnouncements/',
        addAnnouncement: baseUrl + 'Announcement/addAnnouncement/',
        /* End of Dashboard / Announcements*/
    },
};

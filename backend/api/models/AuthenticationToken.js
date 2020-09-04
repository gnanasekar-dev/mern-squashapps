/**
* AuthenticationToken.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    // To support multi device login, we need to use one to many relationship

    attributes: {
        token: {
            type: 'string',
            maxLength: 512
        },
        user_id: {
            model: 'customer'
        },
    },
};

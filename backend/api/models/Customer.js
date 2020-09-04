/**
 * Customer.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {

		first_name: {
			type: 'string',
		},
		last_name: {
			type: 'string',
		},
		email: {
			type: 'string',
			required: true,
			unique: true,
			isEmail: true,
		},
		otp: {
			type: 'string',
		},
		password: {
			type: 'string',
		},
		company_name: {
			type: 'string',
		},
		location: {
			type: 'string',
		},
		no_of_employees: {
			type: 'number',
		},
		domain_name: {
			type: 'string',
		},
		status: {
			type: 'string',
		}

	},
	customToJSON: function () {
		return _.omit(this, ['password'])
	},

	authenticatinTokens: {
		collection: 'authenticationtoken',
		via: 'user_id'
	},

	announcements: {
		collection: 'announcement',
		via: 'user_id'
	},

};

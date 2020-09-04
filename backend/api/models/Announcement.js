/**
 * Announcement.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {

		subject: {
			type: 'string',
			required: true,
		},
		category: {
			type: 'string',
			required: true,
		},
		description: {
			type: 'string',
			required: true,
		},
		user_id: {
            model: 'customer'
        },

	},

};

const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {

	/**
	   * User is allowed, proceed to the next policy, or if this is the last policy, the controller
	*/
	if (req.headers.authorization || req.headers['x-access-token']) {

		let token = req.headers.authorization || req.headers['x-access-token'];

		if (token.startsWith('Bearer ')) {
			// Remove Bearer from string
			token = token.slice(7, token.length);
		}

		var decoded = jwt.verify(token, 'sampleseceretkey');

		if(!decoded.id) {
			return res.status(403).json('You are not permitted to perform this action.');
		} else {

			try {
			
				AuthenticationToken.findOne({token: token})
				.exec(function (err, foundAuthToken) {

					if (err) return res.status(403).json('You are not permitted to perform this action.');

					if(decoded.id === foundAuthToken.user_id) {
						// Append user_id to req to use later in next policy or the controller 

						req.user_id = foundAuthToken.user_id;

						return next();
					} else {

						return res.status(403).json('You are not permitted to perform this action.');
					}
				});
	
			} catch (err) {
				return res.status(403).json('You are not permitted to perform this action.');
			}
		}
		
	} else {

		/**
		 * User is not allowed
		 * (default res.forbidden() behavior can be overridden in `config/403.js`)
		*/
		res.status(403).json('You are not permitted to perform this action.');
	}
	
};

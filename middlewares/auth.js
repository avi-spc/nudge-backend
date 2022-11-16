const config = require('config');
const jwt = require('jsonwebtoken');

const ResponseTypes = require('../utils/responseTypes');

const authenticate = (req, res, next) => {
	const token = req.header('x-auth-token');
	if (!token) {
		return res.status(400).json({
			type: ResponseTypes.ERROR,
			errors: [{ msg: 'no token, authorization denied' }]
		});
	}

	try {
		const decoded = jwt.verify(token, config.get('jwtSecret') || process.env.JWT_SECRET);
		req.user = decoded.user;

		next();
	} catch (err) {
		res.status(401).json({ type: ResponseTypes.ERROR, errors: [{ msg: 'invalid token' }] });
	}
};

module.exports = authenticate;

const config = require('config');
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
	const token = req.header('x-auth-token');
	if (!token) {
		return res.status(400).json({ msg: 'no token, authorization denied' });
	}

	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		req.user = decoded.user;

		next();
	} catch (err) {
		res.status(401).json({ msg: 'invalid token' });
	}
};

module.exports = authenticate;

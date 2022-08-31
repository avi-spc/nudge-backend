const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const auth = require('../../middlewares/auth');

const User = require('../../models/User');

router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.status(200).json(user);
	} catch (err) {
		res.status(500).send('Server error');
	}
});

router.post(
	'/',
	[
		check('email', 'valid email is required').isEmail(),
		check('password', 'passwrod is required').exists()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ errors: [{ msg: 'invalid credentials' }] });
			}

			const passwordHasMatched = await bcrypt.compare(password, user.password);
			if (!passwordHasMatched) {
				return res.status(400).json({ errors: [{ msg: 'invalid credentials' }] });
			}

			const payload = {
				user: { id: user.id }
			};

			jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
				if (err) throw err;
				res.status(200).json({ token });
			});
		} catch (err) {
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;

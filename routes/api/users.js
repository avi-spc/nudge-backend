const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route		POST: api/users
// @desc		Register new user
// @access		Public
router.post(
	'/',
	[
		check('email', 'valid email is required').isEmail(),
		check('password', 'password must be of 6 or more characters').isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			let user = new User({
				email,
				password
			});

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const payload = {
				user: { id: user.id }
			};

			jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
				if (err) throw err;
				res.status(200).json({ token });
			});
		} catch (err) {
			if (err.code === 11000 && 'email' in err.keyPattern) {
				return res.status(400).json({ errors: [{ msg: 'user already exists' }] });
			}

			res.status(500).send('Server error');
		}
	}
);

module.exports = router;

const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

router.post(
	'/',
	[
		check('name', 'name is required').not().isEmpty(),
		check('email', 'valid email is required').isEmail(),
		check('password', 'password must be of 6 or more characters').isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ errors: [{ msg: 'user already exists' }] });
			}

			user = new User({
				name,
				email,
				password
			});

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			await user.save();

			res.send('Users route');
		} catch (err) {
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;

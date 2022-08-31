const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const auth = require('../../middlewares/auth');

const Profile = require('../../models/Profile');

router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		if (!profile) {
			return res.status(400).json({ msg: 'profile not found' });
		}

		res.status(200).json(profile);
	} catch (err) {
		res.status(500).send('Server error');
	}
});

router.post(
	'/',
	[
		auth,
		[
			check('name', 'name is required').not().isEmpty(),
			check('username', 'username is required').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, username, bio } = req.body;

		try {
			let profile = await Profile.findOne({ user: req.user.id });
			if (profile) {
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: { name, username, bio } },
					{ new: true }
				);

				return res.status(200).json({ msg: 'profile updated', profile });
			}

			profile = new Profile({
				user: req.user.id,
				name,
				username,
				bio: ''
			});

			await profile.save();

			res.status(200).json({ msg: 'profile created', profile });
		} catch (err) {
			if (err.code === 11000 && 'username' in err.keyPattern) {
				return res.status(400).json({ errors: [{ msg: 'username already exists' }] });
			}

			res.status(500).send('Server error');
		}
	}
);

router.get('/user/:user_id', async (req, res) => {
	try {
		const user_id = req.params.user_id;

		const profile = await Profile.findOne({ user: user_id });
		if (!profile) {
			return res.status(400).json({ msg: 'profile not found' });
		}

		res.status(200).json(profile);
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(400).json({ errors: [{ msg: 'profile not found' }] });
		}

		res.status(500).send('Server error');
	}
});

module.exports = router;

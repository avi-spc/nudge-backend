const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const { ProfileStream } = require('../../config/db');

const ErrorTypes = require('../../utils/errorTypes');
const ResponseTypes = require('../../utils/responseTypes');

const auth = require('../../middlewares/auth');
const imageUploadHandler = require('../../middlewares/upload');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route		GET: api/profile/me
// @desc		Retrieve current user profile
// @access		Private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		if (!profile) {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.PROFILE_NOT_FOUND }] });
		}

		res.status(200).json({ type: ResponseTypes.SUCCESS, profile });
	} catch (err) {
		res.status(500).json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.SERVER_ERROR }] });
	}
});

// @route		POST: api/profile
// @desc		Create/Update current user's profile
// @access		Private
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
			return res.status(400).json({ type: ResponseTypes.ERROR, errors: errors.array() });
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

				return res.status(200).json({ type: ResponseTypes.SUCCESS, msg: 'profile updated', profile });
			}

			profile = new Profile({
				user: req.user.id,
				name,
				username,
				bio: ''
			});

			await profile.save();

			res.status(200).json({ type: ResponseTypes.SUCCESS, msg: 'profile created', profile });
		} catch (err) {
			if (err.code === 11000 && 'username' in err.keyPattern) {
				return res
					.status(400)
					.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.USERNAME_ALREADY_EXISTS }] });
			}

			res.status(500).json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.SERVER_ERROR }] });
		}
	}
);

// @route		GET: api/profile/user/:user_id
// @desc		Retrieve profile of a user
// @access		Public
router.get('/user/:user_id', async (req, res) => {
	try {
		const user_id = req.params.user_id;

		const profile = await Profile.findOne({ user: user_id });
		if (!profile) {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.PROFILE_NOT_FOUND }] });
		}

		res.status(200).json({ type: ResponseTypes.SUCCESS, data: { profile } });
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.PROFILE_NOT_FOUND }] });
		}

		res.status(500).json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.SERVER_ERROR }] });
	}
});

// @route		DELETE: api/profile
// @desc		Delete current user's account
// @access		Private
router.delete('/', auth, async (req, res) => {
	try {
		const profile = await Profile.findOneAndRemove({ user: req.user.id });

		if (profile.imageId) {
			await ProfileStream().delete(profile.imageId, (err, result) => {
				if (err) throw err;
			});
		}

		await User.findOneAndRemove({ _id: req.user.id });

		res.status(200).json({ type: ResponseTypes.SUCCESS, data: { msg: 'user deleted' } });
	} catch (err) {
		res.status(500).json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.SERVER_ERROR }] });
	}
});

// @route		POST: api/profile/profileImage
// @desc		Upload profile image
// @access		Private
router.post('/profileImage', [auth, imageUploadHandler], async (req, res) => {
	try {
		if (!req.file) {
			return res.json({ type: ResponseTypes.ERROR, errors: [{ msg: 'choose an image to upload' }] });
		}

		const profile = await Profile.findOneAndUpdate(
			{ user: req.user.id },
			{ $set: { imageId: req.file.id } },
			{ new: true }
		);

		res.status(200).json({ type: ResponseTypes.SUCCESS, data: { msg: 'profile image added', profile } });
	} catch (err) {
		res.status(500).json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.SERVER_ERROR }] });
	}
});

// @route		PUT: api/profile/profileImage
// @desc		Update profile image
// @access		Private
router.put('/profileImage', [auth, imageUploadHandler], async (req, res) => {
	try {
		if (!req.file) {
			return res.json({ type: ResponseTypes.ERROR, errors: [{ msg: 'choose an image to replace' }] });
		}

		let profile = await Profile.findOne({ user: req.user.id });

		if (profile.imageId) {
			await ProfileStream().delete(profile.imageId, (err, result) => {
				if (err) throw err;
			});
		}

		profile = await Profile.findOneAndUpdate(
			{ user: req.user.id },
			{ $set: { imageId: req.file.id } },
			{ new: true }
		);

		res
			.status(200)
			.json({ type: ResponseTypes.SUCCESS, data: { msg: 'profile image updated', profile } });
	} catch (err) {
		res.status(500).json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.SERVER_ERROR }] });
	}
});

// @route		DELETE: api/profile/profileImage
// @desc		Delete profile image
// @access		Private
router.delete('/profileImage', auth, async (req, res) => {
	try {
		let profile = await Profile.findOne({ user: req.user.id });

		await ProfileStream().delete(profile.imageId, (err, result) => {
			if (err) throw err;
		});

		profile = await Profile.findOneAndUpdate(
			{ user: req.user.id },
			{ $set: { imageId: null } },
			{ new: true }
		);

		res
			.status(200)
			.json({ type: ResponseTypes.SUCCESS, data: { msg: 'profile image deleted', profile } });
	} catch (err) {
		res.status(500).json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.SERVER_ERROR }] });
	}
});

module.exports = router;

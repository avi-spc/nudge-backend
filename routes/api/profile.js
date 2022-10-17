const mongoose = require('mongoose');
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
			return res.status(400).json({
				type: ResponseTypes.ERROR,
				errors: [{ msg: ErrorTypes.PROFILE_NOT_FOUND }]
			});
		}

		res.status(200).json({ type: ResponseTypes.SUCCESS, profile });
	} catch (err) {
		res.status(500).json({
			type: ResponseTypes.ERROR,
			errors: [{ msg: ErrorTypes.SERVER_ERROR }]
		});
	}
});

// @route		POST: api/profile
// @desc		Create current user's profile
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

		const { name, username } = req.body;

		try {
			const profile = new Profile({
				user: req.user.id,
				name,
				username,
				bio: ''
			});

			await profile.save();
			await User.findByIdAndUpdate(
				req.user.id,
				{ $set: { username: profile.username } },
				{ new: true }
			);

			res.status(200).json({ type: ResponseTypes.SUCCESS, msg: 'profile created', profile });
		} catch (err) {
			if (err.code === 11000 && 'username' in err.keyPattern) {
				return res.status(400).json({
					type: ResponseTypes.ERROR,
					errors: [{ msg: ErrorTypes.USERNAME_ALREADY_EXISTS }]
				});
			}

			res.status(500).json({
				type: ResponseTypes.ERROR,
				errors: [{ msg: ErrorTypes.SERVER_ERROR }]
			});
		}
	}
);

// @route		PUT: api/profile
// @desc		Update current user's profile
// @access		Private
router.put(
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
			const profile = await Profile.findOneAndUpdate(
				{ user: req.user.id },
				{ $set: { name, username, bio } },
				{ new: true }
			);

			await User.findByIdAndUpdate(
				req.user.id,
				{ $set: { username: profile.username } },
				{ new: true }
			);

			return res
				.status(200)
				.json({ type: ResponseTypes.SUCCESS, msg: 'profile updated', profile });
		} catch (err) {
			if (err.code === 11000 && 'username' in err.keyPattern) {
				return res.status(400).json({
					type: ResponseTypes.ERROR,
					errors: [{ msg: ErrorTypes.USERNAME_ALREADY_EXISTS }]
				});
			}

			res.status(500).json({
				type: ResponseTypes.ERROR,
				errors: [{ msg: ErrorTypes.SERVER_ERROR }]
			});
		}
	}
);

// @route		GET: api/profile/user/:user_id
// @desc		Retrieve profile of a user
// @access		Public
router.get('/user/:user_id', async (req, res) => {
	try {
		const user_id = req.params.user_id;

		const profile = await Profile.findOne({ user: user_id }).populate('user', 'posts');

		if (!profile) {
			return res.status(400).json({
				type: ResponseTypes.ERROR,
				errors: [{ msg: ErrorTypes.PROFILE_NOT_FOUND }]
			});
		}

		res.status(200).json({ type: ResponseTypes.SUCCESS, profile });
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(400).json({
				type: ResponseTypes.ERROR,
				errors: [{ msg: ErrorTypes.PROFILE_NOT_FOUND }]
			});
		}

		res.status(500).json({
			type: ResponseTypes.ERROR,
			errors: [{ msg: ErrorTypes.SERVER_ERROR }]
		});
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
				if (err) {
					return res.status(400).json({
						type: ResponseTypes.ERROR,
						errors: [{ msg: ErrorTypes.IMAGE_NOT_FOUND }]
					});
				}
			});
		}

		await User.findOneAndRemove({ _id: req.user.id });

		res.status(200).json({ type: ResponseTypes.SUCCESS, data: { msg: 'user deleted' } });
	} catch (err) {
		res.status(500).json({
			type: ResponseTypes.ERROR,
			errors: [{ msg: ErrorTypes.SERVER_ERROR }]
		});
	}
});

// @route		GET: api/profile/image/:image_id
// @desc		Stream profile image
// @access		Private
router.get('/image/:image_id', async (req, res) => {
	if (!mongoose.isObjectIdOrHexString(req.params.image_id)) {
		return res
			.status(400)
			.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.IMAGE_NOT_FOUND }] });
	}

	try {
		const images = await ProfileStream()
			.find({ _id: mongoose.Types.ObjectId(req.params.image_id) })
			.toArray();

		if (!images) {
			return res
				.status(404)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.IMAGE_NOT_FOUND }] });
		}

		const stream = ProfileStream().openDownloadStreamByName(images[0].filename);

		stream.pipe(res);
	} catch (err) {
		res.status(500).json({
			type: ResponseTypes.ERROR,
			errors: [{ msg: ErrorTypes.SERVER_ERROR }]
		});
	}
});

// @route		POST: api/profile/image (not in use yet)
// @desc		Upload profile image
// @access		Private
router.post('/image', [auth, imageUploadHandler], async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({
				type: ResponseTypes.ERROR,
				errors: [{ msg: 'choose an image to upload' }]
			});
		}

		const profile = await Profile.findOneAndUpdate(
			{ user: req.user.id },
			{ $set: { imageId: req.file.id } },
			{ new: true }
		);

		res.status(200).json({
			type: ResponseTypes.SUCCESS,
			data: { msg: 'profile image added', profile }
		});
	} catch (err) {
		res.status(500).json({
			type: ResponseTypes.ERROR,
			errors: [{ msg: ErrorTypes.SERVER_ERROR }]
		});
	}
});

// @route		PUT: api/profile/image
// @desc		Update profile image
// @access		Private
router.put('/image', [auth, imageUploadHandler], async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({
				type: ResponseTypes.ERROR,
				errors: [{ msg: 'choose an image to upload' }]
			});
		}

		let profile = await Profile.findOne({ user: req.user.id });

		if (profile.imageId) {
			await ProfileStream().delete(profile.imageId, (err, result) => {
				if (err) {
					return res.status(400).json({
						type: ResponseTypes.ERROR,
						errors: [{ msg: ErrorTypes.IMAGE_NOT_FOUND }]
					});
				}
			});
		}

		profile = await Profile.findOneAndUpdate(
			{ user: req.user.id },
			{ $set: { imageId: req.file.id } },
			{ new: true }
		);

		await User.findByIdAndUpdate(
			req.user.id,
			{ $set: { profileImageId: profile.imageId } },
			{ new: true }
		);

		res.status(200).json({
			type: ResponseTypes.SUCCESS,
			msg: 'profile image updated',
			profile
		});
	} catch (err) {
		res.status(500).json({
			type: ResponseTypes.ERROR,
			errors: [{ msg: ErrorTypes.SERVER_ERROR }]
		});
	}
});

// @route		DELETE: api/profile/image
// @desc		Delete profile image
// @access		Private
router.delete('/image', auth, async (req, res) => {
	try {
		let profile = await Profile.findOne({ user: req.user.id });

		await ProfileStream().delete(profile.imageId, (err, result) => {
			if (err) {
				return res.status(400).json({
					type: ResponseTypes.ERROR,
					errors: [{ msg: ErrorTypes.IMAGE_NOT_FOUND }]
				});
			}
		});

		profile = await Profile.findOneAndUpdate(
			{ user: req.user.id },
			{ $set: { imageId: null } },
			{ new: true }
		);

		await User.findOneAndUpdate(
			{ user: req.user.id },
			{ $set: { profileImageId: null } },
			{ new: true }
		);

		res.status(200).json({
			type: ResponseTypes.SUCCESS,
			msg: 'profile image removed',
			profile
		});
	} catch (err) {
		res.status(500).json({
			type: ResponseTypes.ERROR,
			errors: [{ msg: ErrorTypes.SERVER_ERROR }]
		});
	}
});

module.exports = router;

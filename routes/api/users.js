const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const ErrorTypes = require('../../utils/errorTypes');
const ResponseTypes = require('../../utils/responseTypes');

const auth = require('../../middlewares/auth');

const Notification = require('../../models/Notification');
const Profile = require('../../models/Profile');
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
			return res.status(400).json({ type: ResponseTypes.ERROR, errors: errors.array() });
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

			const notification = new Notification({
				user: user.id
			});

			await notification.save();

			const payload = {
				user: { id: user.id }
			};

			jwt.sign(
				payload,
				config.get('jwtSecret') || process.env.JWT_SECRET,
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.status(200).json({ type: ResponseTypes.SUCCESS, token });
				}
			);
		} catch (err) {
			if (err.code === 11000 && 'email' in err.keyPattern) {
				return res.status(400).json({
					type: ResponseTypes.ERROR,
					errors: [{ msg: ErrorTypes.USER_ALREADY_EXISTS }]
				});
			}

			res.status(500).json({
				type: ResponseTypes.ERROR,
				errors: [{ msg: ErrorTypes.SERVER_ERROR }]
			});
		}
	}
);

// @route		POST: api/users/follow/:user_id
// @desc		Follow a user
// @access		Private
router.post('/follow/:user_id', auth, async (req, res) => {
	try {
		let user = await User.findByIdAndUpdate(
			req.params.user_id,
			{ $addToSet: { 'follows.followers': { user: req.user.id } } },
			{ new: true }
		);

		if (!user) {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.USER_NOT_FOUND }] });
		}

		user = await User.findByIdAndUpdate(
			req.user.id,
			{
				$addToSet: { 'follows.following': { user: req.params.user_id } }
			},
			{ new: true }
		);

		await Notification.findOneAndUpdate(
			{
				user: req.params.user_id,
				notifications: { $not: { $elemMatch: { id: `${req.user.id}follow` } } }
			},
			{
				$push: {
					notifications: {
						$each: [
							{
								id: `${req.user.id}follow`,
								user: req.user.id,
								nType: 'follow'
							}
						],
						$position: 0
					}
				}
			},
			{ new: true }
		);

		res.status(200).json({
			type: ResponseTypes.SUCCESS,
			msg: 'user followed',
			follows: user.follows
		});
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.USER_NOT_FOUND }] });
		}

		res.status(500).json({
			type: ResponseTypes.ERROR,
			errors: [{ msg: ErrorTypes.SERVER_ERROR }]
		});
	}
});

// @route		DELETE: api/users/unfollow/:user_id
// @desc		Unfollow a user
// @access		Private
router.delete('/unfollow/:user_id', auth, async (req, res) => {
	try {
		let user = await User.findByIdAndUpdate(
			req.params.user_id,
			{ $pull: { 'follows.followers': { user: req.user.id } } },
			{ new: true }
		);

		if (!user) {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.USER_NOT_FOUND }] });
		}

		user = await User.findByIdAndUpdate(
			req.user.id,
			{ $pull: { 'follows.following': { user: req.params.user_id } } },
			{ new: true }
		);

		await Notification.findOneAndUpdate(
			{ user: req.params.user_id },
			{ $pull: { notifications: { id: `${req.user.id}follow` } } },
			{ new: true }
		);

		res.status(200).json({
			type: ResponseTypes.SUCCESS,
			msg: 'user unfollowed',
			follows: user.follows
		});
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.USER_NOT_FOUND }] });
		}

		res.status(500).json({
			type: ResponseTypes.ERROR,
			errors: [{ msg: ErrorTypes.SERVER_ERROR }]
		});
	}
});

// @route		GET: api/users/savedPosts
// @desc		Retrieve current user's saved posts
// @access		Private
router.get('/save/me', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).populate({
			path: 'savedPosts.post',
			select: 'imageId'
		});

		res.status(200).json({ type: ResponseTypes.SUCCESS, savedPosts: user.savedPosts });
	} catch (err) {
		res.status(500).json({
			type: ResponseTypes.ERROR,
			errors: [{ msg: ErrorTypes.SERVER_ERROR }]
		});
	}
});

// @route		GET: api/users/follows
// @desc		Retrieve current user's follows
// @access		Private
router.get('/follows/:user_id', auth, async (req, res) => {
	try {
		const user = await User.findById(req.params.user_id)
			.populate({
				path: 'follows.followers.user',
				select: 'username profileImageId'
			})
			.populate({
				path: 'follows.following.user',
				select: 'username profileImageId'
			});

		if (!user) {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.USER_NOT_FOUND }] });
		}

		res.status(200).json({ type: ResponseTypes.SUCCESS, follows: user.follows });
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.USER_NOT_FOUND }] });
		}

		res.status(500).json({
			type: ResponseTypes.ERROR,
			errors: [{ msg: ErrorTypes.SERVER_ERROR }]
		});
	}
});

// @route		GET: api/users/:user_name
// @desc		Search users by their name/username
// @access		Private
router.get('/:user_name', auth, async (req, res) => {
	try {
		const users = await Profile.find({
			$or: [
				{ name: { $regex: req.params.user_name, $options: 'i' } },
				{ username: { $regex: req.params.user_name, $options: 'i' } }
			]
		});

		res.status(200).json({ type: ResponseTypes.SUCCESS, users });
	} catch (err) {
		res.status(500).json({
			type: ResponseTypes.ERROR,
			errors: [{ msg: ErrorTypes.SERVER_ERROR }]
		});
	}
});

module.exports = router;

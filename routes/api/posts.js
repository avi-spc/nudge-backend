const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const auth = require('../../middlewares/auth');

const Post = require('../../models/Post');

router.post(
	'/',
	[
		auth,
		[
			check('caption').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { caption } = req.body;

		try {
			const post = new Post({
				user: req.user.id,
				caption
			});

			await post.save();

			res.status(200).json({ msg: 'post created', post });
		} catch (err) {
			res.status(500).send('Server error');
		}
	}
);

router.get('/', auth, async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: 'desc' });

		res.status(200).json(posts);
	} catch (err) {
		res.status(500).send('Server error');
	}
});

router.get('/:post_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);
		if (!post) {
			return res.status(400).json({ msg: 'profile not found' });
		}

		res.status(200).json(post);
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(400).json({ errors: [{ msg: 'post not found' }] });
		}
		res.status(500).send('Server error');
	}
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const auth = require('../../middlewares/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');

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
			return res.status(400).json({ msg: 'post not found' });
		}

		res.status(200).json(post);
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(400).json({ errors: [{ msg: 'post not found' }] });
		}

		res.status(500).send('Server error');
	}
});

router.get('/user/:user_id', auth, async (req, res) => {
	try {
		const user = await User.findById(req.params.user_id);
		if (!user) {
			return res.status(400).json({ msg: 'user not found' });
		}

		const posts = await Post.find({ user: req.params.user_id }).sort({ date: 'desc' });

		res.status(200).json(posts);
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(400).json({ errors: [{ msg: 'user not found' }] });
		}

		res.status(500).send('Server error');
	}
});

router.delete('/:post_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);
		if (!post) {
			return res.status(400).json({ msg: 'post not found' });
		}

		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'user not authorized' });
		}

		await post.deleteOne();

		res.status(200).json({ msg: 'post deleted', post });
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(400).json({ errors: [{ msg: 'post not found' }] });
		}

		res.status(500).send('Server error');
	}
});

router.post('/like/:post_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);
		if (!post) {
			return res.status(400).json({ msg: 'post not found' });
		}

		let msg = '';
		const removeIndex = post.likes.findIndex((like) => {
			return like.user.toString() === req.user.id;
		});

		if (removeIndex >= 0) {
			post.likes.splice(removeIndex, 1);
			msg = 'post unliked';
		} else {
			post.likes.unshift({ user: req.user.id });
			msg = 'post liked';
		}

		await post.save();

		res.status(200).json({ msg, post });
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(400).json({ errors: [{ msg: 'post not found' }] });
		}

		res.status(500).send('Server error');
	}
});

router.post(
	'/comment/:post_id',
	[
		auth,
		[
			check('comment', 'comment is required').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { comment } = req.body;

		try {
			const post = await Post.findById(req.params.post_id);
			if (!post) {
				return res.status(400).json({ msg: 'post not found' });
			}

			const commentObject = {
				user: req.user.id,
				comment
			};

			post.comments.unshift(commentObject);
			await post.save();

			res.status(200).json({ msg: 'comment created', post });
		} catch (err) {
			if (err.kind === 'ObjectId') {
				return res.status(400).json({ errors: [{ msg: 'post not found' }] });
			}

			res.status(500).send('Server error');
		}
	}
);

router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);
		if (!post) {
			return res.status(400).json({ msg: 'post not found' });
		}

		const comment = post.comments.find((comment) => {
			return comment._id.toString() === req.params.comment_id;
		});

		if (!comment) {
			return res.status(400).json({ msg: 'comment not found' });
		}

		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'user not authorized' });
		}

		const removeIndex = post.comments.findIndex((comment) => {
			return comment._id.toString() === req.params.comment_id;
		});

		post.comments.splice(removeIndex, 1);
		await post.save();

		res.status(200).json({ msg: 'comment deleted', post });
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(400).json({ errors: [{ msg: 'post not found' }] });
		}

		res.status(500).send('Server error');
	}
});

module.exports = router;

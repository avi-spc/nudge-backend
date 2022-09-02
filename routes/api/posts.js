const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const auth = require('../../middlewares/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');

// @route		POST: api/posts
// @desc		Create new post
// @access		Private
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

// @route		GET: api/posts
// @desc		Retrieve all posts
// @access		Private
router.get('/', auth, async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: 'desc' });

		res.status(200).json(posts);
	} catch (err) {
		res.status(500).send('Server error');
	}
});

// @route		GET: api/posts/:post_id
// @desc		Retrieve a post
// @access		Private
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

// @route		GET: api/posts/user/:user_id
// @desc		Retrieve all posts from a user
// @access		Private
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

// @route		DELETE: api/posts/:post_id
// @desc		Delete a post
// @access		Private
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

// @route		POST: api/posts/like/:post_id
// @desc		Like/Unlike a post
// @access		Private
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

// @route		POST: api/posts/comment/:post_id
// @desc		Add comment on a post
// @access		Private
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

// @route		DELETE: api/posts/comment/:post_id/:comment_id
// @desc		Delete comment on a post
// @access		Private
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

// @route		POST: api/posts/comment/like/:post_id/:comment_id
// @desc		Like/Unlike comment on a post
// @access		Private
router.post('/comment/like/:post_id/:comment_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);
		if (!post) {
			return res.status(400).json({ msg: 'post not found' });
		}

		const commentIndex = post.comments.findIndex((comment) => {
			return comment._id.toString() === req.params.comment_id;
		});
		if (commentIndex === -1) {
			return res.status(400).json({ msg: 'comment not found' });
		}

		let msg = '';
		const removeIndex = post.comments[commentIndex].likes.findIndex((like) => {
			return like.user.toString() === req.user.id;
		});

		if (removeIndex >= 0) {
			post.comments[commentIndex].likes.splice(removeIndex, 1);
			msg = 'comment unliked';
		} else {
			post.comments[commentIndex].likes.unshift({ user: req.user.id });
			msg = 'comment liked';
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

// @route		POST: api/posts/comment/reply/:post_id/:comment_id
// @desc		Reply to comment on a post
// @access		Private
router.post(
	'/comment/reply/:post_id/:comment_id',
	[
		auth,
		[
			check('reply', 'reply is required').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { reply } = req.body;

		try {
			const post = await Post.findById(req.params.post_id);
			if (!post) {
				return res.status(400).json({ msg: 'post not found' });
			}

			const commentIndex = post.comments.findIndex((comment) => {
				return comment._id.toString() === req.params.comment_id;
			});
			if (commentIndex === -1) {
				return res.status(400).json({ msg: 'comment not found' });
			}

			const replyObject = {
				user: req.user.id,
				reply
			};

			post.comments[commentIndex].replies.unshift(replyObject);
			await post.save();

			res.status(200).json({ msg: 'reply added', post });
		} catch (err) {
			if (err.kind === 'ObjectId') {
				return res.status(400).json({ errors: [{ msg: 'post not found' }] });
			}

			res.status(500).send('Server error');
		}
	}
);

// @route		DELETE: api/posts/comment/reply/:post_id/:comment_id/:reply_id
// @desc		Delete reply to comment on a post
// @access		Private
router.delete('/comment/reply/:post_id/:comment_id/:reply_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);
		if (!post) {
			return res.status(400).json({ msg: 'post not found' });
		}

		const commentIndex = post.comments.findIndex((comment) => {
			return comment._id.toString() === req.params.comment_id;
		});
		if (commentIndex === -1) {
			return res.status(400).json({ msg: 'comment not found' });
		}

		const reply = post.comments[commentIndex].replies.find((reply) => {
			return reply._id.toString() === req.params.reply_id;
		});
		if (!reply) {
			return res.status(400).json({ msg: 'reply not found' });
		}

		if (reply.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'user not authorized' });
		}

		const removeIndex = post.comments[commentIndex].replies.findIndex((reply) => {
			return reply._id.toString() === req.params.reply_id;
		});

		post.comments[commentIndex].replies.splice(removeIndex, 1);
		await post.save();

		res.status(200).json({ msg: 'reply deleted', post });
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(400).json({ errors: [{ msg: 'post not found' }] });
		}

		res.status(500).send('Server error');
	}
});

module.exports = router;

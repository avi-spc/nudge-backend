const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const ErrorTypes = require('../../utils/errorTypes');
const ResponseTypes = require('../../utils/responseTypes');

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
			return res.status(400).json({ type: ResponseTypes.ERROR, errors: errors.array() });
		}

		const { caption } = req.body;

		try {
			const post = new Post({
				user: req.user.id,
				caption
			});

			await post.save();

			res.status(200).json({ type: ResponseTypes.SUCCESS, data: { msg: 'post created', post } });
		} catch (err) {
			res.status(500).json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.SERVER_ERROR }] });
		}
	}
);

// @route		GET: api/posts
// @desc		Retrieve all posts
// @access		Private
router.get('/', auth, async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: 'desc' });

		res.status(200).json({ type: ResponseTypes.SUCCESS, data: { posts } });
	} catch (err) {
		res.status(500).json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.SERVER_ERROR }] });
	}
});

// @route		GET: api/posts/:post_id
// @desc		Retrieve a post
// @access		Private
router.get('/:post_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);
		if (!post) {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.USER_ALREADY_EXISTS }] });
		}

		res.status(200).json({ type: ResponseTypes.SUCCESS, data: { post } });
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.POST_NOT_FOUND }] });
		}

		res.status(500).json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.SERVER_ERROR }] });
	}
});

// @route		GET: api/posts/user/:user_id
// @desc		Retrieve all posts from a user
// @access		Private
router.get('/user/:user_id', auth, async (req, res) => {
	try {
		const user = await User.findById(req.params.user_id);
		if (!user) {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.USER_NOT_FOUND }] });
		}

		const posts = await Post.find({ user: req.params.user_id }).sort({ date: 'desc' });

		res.status(200).json({ type: ResponseTypes.SUCCESS, data: { posts } });
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.USER_NOT_FOUND }] });
		}

		res.status(500).json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.SERVER_ERROR }] });
	}
});

// @route		DELETE: api/posts/:post_id
// @desc		Delete a post
// @access		Private
router.delete('/:post_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);
		if (!post) {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.POST_NOT_FOUND }] });
		}

		if (post.user.toString() !== req.user.id) {
			return res
				.status(401)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.USER_NOT_AUTHORIZED }] });
		}

		await post.deleteOne();

		res.status(200).json({ type: ResponseTypes.SUCCESS, data: { msg: 'post deleted', post } });
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.POST_NOT_FOUND }] });
		}

		res.status(500).json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.SERVER_ERROR }] });
	}
});

// @route		POST: api/posts/like/:post_id
// @desc		Like/Unlike a post
// @access		Private
router.post('/like/:post_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);
		if (!post) {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.POST_NOT_FOUND }] });
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

		res.status(200).json({ type: ResponseTypes.SUCCESS, data: { msg, post } });
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.POST_NOT_FOUND }] });
		}

		res.status(500).json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.SERVER_ERROR }] });
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
			return res.status(400).json({ type: ResponseTypes.ERROR, errors: errors.array() });
		}

		const { comment } = req.body;

		try {
			const post = await Post.findById(req.params.post_id);
			if (!post) {
				return res
					.status(400)
					.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.POST_NOT_FOUND }] });
			}

			const commentObject = {
				user: req.user.id,
				comment
			};

			post.comments.unshift(commentObject);
			await post.save();

			res.status(200).json({ type: ResponseTypes.SUCCESS, data: { msg: 'comment created', post } });
		} catch (err) {
			if (err.kind === 'ObjectId') {
				return res
					.status(400)
					.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.POST_NOT_FOUND }] });
			}

			res.status(500).json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.SERVER_ERROR }] });
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
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.POST_NOT_FOUND }] });
		}

		const comment = post.comments.find((comment) => {
			return comment._id.toString() === req.params.comment_id;
		});

		if (!comment) {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.COMMENT_NOT_FOUND }] });
		}

		if (comment.user.toString() !== req.user.id) {
			return res
				.status(401)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.USER_NOT_AUTHORIZED }] });
		}

		const removeIndex = post.comments.findIndex((comment) => {
			return comment._id.toString() === req.params.comment_id;
		});

		post.comments.splice(removeIndex, 1);
		await post.save();

		res.status(200).json({ type: ResponseTypes.SUCCESS, data: { msg: 'comment deleted', post } });
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.POST_NOT_FOUND }] });
		}

		res.status(500).json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.SERVER_ERROR }] });
	}
});

// @route		POST: api/posts/comment/like/:post_id/:comment_id
// @desc		Like/Unlike comment on a post
// @access		Private
router.post('/comment/like/:post_id/:comment_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);
		if (!post) {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.POST_NOT_FOUND }] });
		}

		const commentIndex = post.comments.findIndex((comment) => {
			return comment._id.toString() === req.params.comment_id;
		});
		if (commentIndex === -1) {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.COMMENT_NOT_FOUND }] });
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

		res.status(200).json({ type: ResponseTypes.SUCCESS, data: { msg, post } });
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.POST_NOT_FOUND }] });
		}

		res.status(500).json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.SERVER_ERROR }] });
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
			return res.status(400).json({ type: ResponseTypes.ERROR, errors: errors.array() });
		}

		const { reply } = req.body;

		try {
			const post = await Post.findById(req.params.post_id);
			if (!post) {
				return res
					.status(400)
					.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.POST_NOT_FOUND }] });
			}

			const commentIndex = post.comments.findIndex((comment) => {
				return comment._id.toString() === req.params.comment_id;
			});
			if (commentIndex === -1) {
				return res
					.status(400)
					.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.COMMENT_NOT_FOUND }] });
			}

			const replyObject = {
				user: req.user.id,
				reply
			};

			post.comments[commentIndex].replies.unshift(replyObject);
			await post.save();

			res.status(200).json({ type: ResponseTypes.SUCCESS, data: { msg: 'reply added', post } });
		} catch (err) {
			if (err.kind === 'ObjectId') {
				return res
					.status(400)
					.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.POST_NOT_FOUND }] });
			}

			res.status(500).json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.SERVER_ERROR }] });
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
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.POST_NOT_FOUND }] });
		}

		const commentIndex = post.comments.findIndex((comment) => {
			return comment._id.toString() === req.params.comment_id;
		});
		if (commentIndex === -1) {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.COMMENT_NOT_FOUND }] });
		}

		const reply = post.comments[commentIndex].replies.find((reply) => {
			return reply._id.toString() === req.params.reply_id;
		});
		if (!reply) {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.REPLY_NOT_FOUND }] });
		}

		if (reply.user.toString() !== req.user.id) {
			return res
				.status(401)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.USER_NOT_AUTHORIZED }] });
		}

		const removeIndex = post.comments[commentIndex].replies.findIndex((reply) => {
			return reply._id.toString() === req.params.reply_id;
		});

		post.comments[commentIndex].replies.splice(removeIndex, 1);
		await post.save();

		res.status(200).json({ type: ResponseTypes.SUCCESS, data: { msg: 'reply deleted', post } });
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.POST_NOT_FOUND }] });
		}

		res.status(500).json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.SERVER_ERROR }] });
	}
});

module.exports = router;

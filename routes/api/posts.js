const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const { PostStream } = require('../../config/db');

const ErrorTypes = require('../../utils/errorTypes');
const ResponseTypes = require('../../utils/responseTypes');

const auth = require('../../middlewares/auth');
const imageUploadHandler = require('../../middlewares/upload');

const Post = require('../../models/Post');
const User = require('../../models/User');

// @route		POST: api/posts
// @desc		Create new post
// @access		Private
router.post('/', [auth, imageUploadHandler], async (req, res) => {
	const { caption } = req.body;

	try {
		const post = new Post({
			user: req.user.id,
			imageId: req.file.id,
			caption
		});

		await post.save();

		res.status(200).json({ type: ResponseTypes.SUCCESS, data: { msg: 'post created', post } });
	} catch (err) {
		res.status(500).json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.SERVER_ERROR }] });
	}
});

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

		await PostStream().delete(post.imageId, (err, result) => {
			if (err) throw err;
		});

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
// @desc		Like a post
// @access		Private
router.post('/like/:post_id', auth, async (req, res) => {
	try {
		const post = await Post.findByIdAndUpdate(
			req.params.post_id,
			{ $addToSet: { likes: { user: req.user.id } } },
			{ new: true }
		);

		if (!post) {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.POST_NOT_FOUND }] });
		}

		res.status(200).json({ type: ResponseTypes.SUCCESS, data: { msg: 'post liked', post } });
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.POST_NOT_FOUND }] });
		}

		res.status(500).json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.SERVER_ERROR }] });
	}
});

// @route		DELETE: api/posts/unlike/:post_id
// @desc		Unlika a post
// @access		Private
router.delete('/unlike/:post_id', auth, async (req, res) => {
	try {
		const post = await Post.findByIdAndUpdate(
			req.params.post_id,
			{ $pull: { likes: { user: req.user.id } } },
			{ new: true }
		);

		if (!post) {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.POST_NOT_FOUND }] });
		}

		res.status(200).json({ type: ResponseTypes.SUCCESS, data: { msg: 'post unliked', post } });
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

		if (comment.user.toString() !== req.user.id && post.user.toString() !== req.user.id) {
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
// @desc		Like comment on a post
// @access		Private
router.post('/comment/like/:post_id/:comment_id', auth, async (req, res) => {
	if (!mongoose.isObjectIdOrHexString(req.params.post_id)) {
		return res
			.status(400)
			.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.POST_NOT_FOUND }] });
	}

	if (!mongoose.isObjectIdOrHexString(req.params.comment_id)) {
		return res
			.status(400)
			.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.COMMENT_NOT_FOUND }] });
	}

	try {
		const post = await Post.findById(req.params.post_id);
		if (!post) {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.POST_NOT_FOUND }] });
		}

		const comments = await Post.findOneAndUpdate(
			{ _id: req.params.post_id, 'comments._id': req.params.comment_id },
			{ $addToSet: { 'comments.$.likes': { user: req.user.id } } },
			{ new: true }
		).select('comments');

		if (!comments) {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.COMMENT_NOT_FOUND }] });
		}

		res.status(200).json({ type: ResponseTypes.SUCCESS, data: { msg: 'comment liked', comments } });
	} catch (err) {
		res.status(500).json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.SERVER_ERROR }] });
	}
});

// @route		DELETE: api/posts/comment/unlike/:post_id/:comment_id
// @desc		Unlike comment on a post
// @access		Private
router.delete('/comment/unlike/:post_id/:comment_id', auth, async (req, res) => {
	if (!mongoose.isObjectIdOrHexString(req.params.post_id)) {
		return res
			.status(400)
			.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.POST_NOT_FOUND }] });
	}

	if (!mongoose.isObjectIdOrHexString(req.params.comment_id)) {
		return res
			.status(400)
			.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.COMMENT_NOT_FOUND }] });
	}

	try {
		const post = await Post.findById(req.params.post_id);
		if (!post) {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.POST_NOT_FOUND }] });
		}

		const comments = await Post.findOneAndUpdate(
			{ _id: req.params.post_id, 'comments._id': req.params.comment_id },
			{ $pull: { 'comments.$.likes': { user: req.user.id } } },
			{ new: true }
		).select('comments');

		if (!comments) {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.COMMENT_NOT_FOUND }] });
		}

		res.status(200).json({ type: ResponseTypes.SUCCESS, data: { msg: 'comment unliked', comments } });
	} catch (err) {
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

		if (reply.user.toString() !== req.user.id && post.user.toString() !== req.user.id) {
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

// @route		GET: api/posts/save/me
// @desc		Retrieve saved posts for current user
// @access		Private
router.get('/save/me', auth, async (req, res) => {
	try {
		const savedPosts = await User.findById(req.user.id).select(['-_id', 'savedPosts']);

		res.status(200).json({ type: ResponseTypes.SUCCESS, data: savedPosts });
	} catch (err) {
		res.status(500).json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.SERVER_ERROR }] });
	}
});

// @route		POST: api/posts/save/:post_id
// @desc		Adding post to saves
// @access		Private
router.post('/save/:post_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);
		if (!post) {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.POST_NOT_FOUND }] });
		}

		const user = await User.findByIdAndUpdate(
			req.user.id,
			{ $addToSet: { savedPosts: { post: req.params.post_id } } },
			{ new: true }
		);

		res.status(200).json({
			type: ResponseTypes.SUCCESS,
			data: { msg: 'post added to saves', savedPosts: user.savedPosts }
		});
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.POST_NOT_FOUND }] });
		}

		res.status(500).json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.SERVER_ERROR }] });
	}
});

// @route		DELETE: api/posts/unsave/:post_id
// @desc		Removing post from saves
// @access		Private
router.delete('/unsave/:post_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);
		if (!post) {
			return res
				.status(400)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.POST_NOT_FOUND }] });
		}

		const user = await User.findByIdAndUpdate(
			req.user.id,
			{ $pull: { savedPosts: { post: req.params.post_id } } },
			{ new: true }
		);

		res.status(200).json({
			type: ResponseTypes.SUCCESS,
			data: { msg: 'post removed from saves', savedPosts: user.savedPosts }
		});
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

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	caption: {
		type: String,
		required: true
	},
	likes: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'user'
			}
		}
	],
	comments: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'user'
			},
			comment: {
				type: String,
				required: true
			},
			likes: [
				{
					user: {
						type: mongoose.Schema.Types.ObjectId,
						ref: 'user'
					}
				}
			],
			replies: [
				{
					user: {
						type: mongoose.Schema.Types.ObjectId,
						ref: 'user'
					},
					reply: {
						type: String,
						required: true
					},
					date: {
						type: Date,
						default: Date.now
					}
				}
			],
			date: {
				type: Date,
				default: Date.now
			}
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Post = mongoose.model('post', PostSchema);

const mongoose = require('mongoose');
const mongooseAutopulate = require('mongoose-autopopulate');

const PostSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		autopopulate: { select: 'username' }
	},
	imageId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	caption: {
		type: String,
		required: true
	},
	likes: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'user',
				autopopulate: { select: 'username' }
			},
			_id: false
		}
	],
	comments: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'user',
				autopopulate: { select: 'username' }
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
					},
					_id: false
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

PostSchema.plugin(mongooseAutopulate);

module.exports = Post = mongoose.model('post', PostSchema);

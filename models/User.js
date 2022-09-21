const mongoose = require('mongoose');
const mongooseAutopulate = require('mongoose-autopopulate');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	username: {
		type: String
	},
	follows: {
		followers: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'user'
				},
				_id: false
			}
		],
		following: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'user'
				},
				_id: false
			}
		]
	},
	savedPosts: [
		{
			post: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'post'
			},
			_id: false
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});

UserSchema.plugin(mongooseAutopulate);

module.exports = User = mongoose.model('user', UserSchema);

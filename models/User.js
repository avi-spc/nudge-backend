const mongoose = require('mongoose');

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
	follows: {
		followers: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'user'
				},
				username: {
					type: String,
					ref: 'profile'
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
				username: {
					type: String,
					ref: 'profile'
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

module.exports = User = mongoose.model('user', UserSchema);

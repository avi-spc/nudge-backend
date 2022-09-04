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
	savedPosts: [
		{
			post: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'post'
			},
			date: {
				type: Date,
				default: Date.now
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

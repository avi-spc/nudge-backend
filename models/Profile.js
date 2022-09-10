const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	imageId: {
		type: mongoose.Schema.Types.ObjectId
	},
	bio: {
		type: String
	}
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);

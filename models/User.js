const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
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
		profileImageId: {
			type: mongoose.Schema.Types.ObjectId
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
		posts: [
			{
				post: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'post'
				},
				imageId: {
					type: mongoose.Schema.Types.ObjectId
				},
				_id: false
			}
		],
		savedPosts: [
			{
				post: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'post'
				},
				_id: false
			}
		]
	},
	{
		timestamps: true
	}
);

module.exports = User = mongoose.model('user', UserSchema);

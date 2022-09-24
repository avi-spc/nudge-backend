const mongoose = require('mongoose');
const mongooseAutopulate = require('mongoose-autopopulate');

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

UserSchema.plugin(mongooseAutopulate);

module.exports = User = mongoose.model('user', UserSchema);

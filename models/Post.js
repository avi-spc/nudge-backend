const mongoose = require('mongoose');
const mongooseAutopulate = require('mongoose-autopopulate');

const PostSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user'
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
					ref: 'user'
				},
				_id: false
			}
		],
		comments: [
			{
				type: new mongoose.Schema(
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
								},
								_id: false
							}
						],
						replies: [
							{
								type: new mongoose.Schema(
									{
										user: {
											type: mongoose.Schema.Types.ObjectId,
											ref: 'user'
										},
										reply: {
											type: String,
											required: true
										}
									},
									{ timestamps: true }
								)
							}
						]
					},
					{ timestamps: true }
				)
			}
		]
	},
	{
		timestamps: true
	}
);

PostSchema.plugin(mongooseAutopulate);

module.exports = Post = mongoose.model('post', PostSchema);

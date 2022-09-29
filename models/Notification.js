const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			required: true
		},
		notifications: [
			{
				type: new mongoose.Schema(
					{
						user: {
							type: mongoose.Schema.Types.ObjectId,
							ref: 'user'
						},
						nType: {
							type: String
						},
						post: {
							type: mongoose.Schema.Types.ObjectId,
							ref: 'post'
						},
						_id: false
					},
					{
						timestamps: true
					}
				)
			}
		]
	},
	{
		timestamps: true
	}
);

module.exports = Notification = mongoose.model('notification', NotificationSchema);

const express = require('express');
const router = express.Router();

const ErrorTypes = require('../../utils/errorTypes');
const ResponseTypes = require('../../utils/responseTypes');

const auth = require('../../middlewares/auth');

const Notification = require('../../models/Notification');

// @route		POST: api/notifications
// @desc		Retrieve all notifications for loggedIn user
// @access		Private
router.get('/', auth, async (req, res) => {
	try {
		const user = await Notification.findOne({ user: req.user.id })
			.select('notifications')
			.populate({
				path: 'notifications.user',
				select: 'username profileImageId'
			});

		res.json({ type: ResponseTypes.SUCCESS, notifications: user.notifications });
	} catch (err) {
		res.status(500).json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.SERVER_ERROR }] });
	}
});

module.exports = router;

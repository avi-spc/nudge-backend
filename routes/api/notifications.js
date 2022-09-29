const express = require('express');
const router = express.Router();

const ErrorTypes = require('../../utils/errorTypes');
const ResponseTypes = require('../../utils/responseTypes');

const auth = require('../../middlewares/auth');

const Notification = require('../../models/Notification');

router.get('/', auth, async (req, res) => {
	try {
		const notifications = await Notification.findOne({ user: req.user.id });

		res.json({ type: ResponseTypes.SUCCESS, notifications });
	} catch (err) {
		res.status(500).json({ type: ResponseTypes.ERROR, errors: [{ msg: ErrorTypes.SERVER_ERROR }] });
	}
});

module.exports = router;

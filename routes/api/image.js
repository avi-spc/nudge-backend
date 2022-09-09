const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/upload');

const handler = (req, res, next) => {
	upload(req, res, (err) => {
		if (err) {
			return res.json({ msg: err.message });
		}

		req.body.file = req.file;
		next();
	});
};

router.post('/upload', handler, async (req, res) => {
	try {
		console.log(req.body);
		res.json({ file: req.body.file });
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;

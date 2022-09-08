const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/upload');

router.post('/upload', upload.single('file'), async (req, res) => {
	try {
		res.json({ file: req.file });
	} catch (err) {
		res.json({ err: err.message });
	}
});

module.exports = router;

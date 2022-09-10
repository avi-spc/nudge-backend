const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const { PostStream } = require('../../config/db');

router.delete('/upload/:id', async (req, res) => {
	try {
		PostStream().delete(mongoose.Types.ObjectId(req.params.id), (err, result) => {
			if (err) throw err;
			console.log(result);
			res.json({ msg: 'file removed' });
		});
	} catch (err) {
		console.log(err.message);
		res.json({ err: err.message });
	}
});

module.exports = router;

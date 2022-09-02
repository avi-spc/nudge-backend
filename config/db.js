const mongoose = require('mongoose');
const config = require('config');

const ConnectDB = async () => {
	try {
		await mongoose.connect(config.get('mongoURI'));
		console.log('Connected to Database');
	} catch (err) {
		console.error(err.message);
	}
};

module.exports = ConnectDB;
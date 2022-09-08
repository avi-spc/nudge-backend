const mongoose = require('mongoose');
const config = require('config');

let connection;

const ConnectDB = async () => {
	try {
		connection = await mongoose.createConnection(config.get('mongoURI')).asPromise();
		console.log('Connected to Database');
	} catch (err) {
		console.error(err.message);
	}
};

module.exports = {
	ConnectDB,
	connection
};

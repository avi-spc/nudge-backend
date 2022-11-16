const mongoose = require('mongoose');
const config = require('config');

const ConnectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI || config.get('mongoURI'));
		console.log('Connected to Database');
	} catch (err) {
		console.error(err.message);
	}
};

let bucketPost, bucketProfile;

mongoose.connection.once('open', () => {
	bucketPost = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'post' });
	bucketProfile = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
		bucketName: 'profile'
	});
});

const PostStream = () => {
	return bucketPost;
};

const ProfileStream = () => {
	return bucketProfile;
};

module.exports = { ConnectDB, PostStream, ProfileStream };

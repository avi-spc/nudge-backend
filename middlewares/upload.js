const path = require('path');
const crypto = require('crypto');

const mongoose = require('mongoose');
const config = require('config');
const multer = require('multer');
const Grid = require('gridfs-stream');
const { GridFsStorage } = require('multer-gridfs-storage');

const database = require('../config/db');

let gfs;

if (database.connection) {
	database.connection.once('open', () => {
		gfs = Grid(mongoose.connection.db, mongoose.mongo);
	});
}

const storage = new GridFsStorage({
	url: config.get('mongoURI'),
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}

				const filename = buf.toString('hex') + path.extname(file.originalname);

				const bucketName = req.header('x-bucket-type');
				if (!((bucketName && bucketName === 'profile') || bucketName === 'post')) {
					return reject('proper upload type required');
				}

				const fileInfo = {
					filename,
					bucketName
				};

				resolve(fileInfo);
			});
		});
	}
});

const upload = multer({
	storage,
	fileFilter: (req, file, callback) => {
		if (req.body.caption === '' || !req.body.caption) {
			callback(new Error('caption is required'));
		}
		if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg')
			callback(null, true);
		else {
			callback(new Error('Only images are required'), false);
		}
	}
});

module.exports = upload;

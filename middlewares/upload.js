const path = require('path');
const crypto = require('crypto');

const config = require('config');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const ResponseTypes = require('../utils/responseTypes');

const storage = new GridFsStorage({
	url:  process.env.MONGO_URI || config.get('mongoURI') ,
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}

				const filename = buf.toString('hex') + path.extname(file.originalname);

				const bucketName = req.header('x-bucket-type');
				if (!bucketName || (bucketName !== 'profile' && bucketName !== 'post')) {
					return reject({ msg: 'proper bucket type required' });
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
		const fieldsValidator = areFormFieldsValid(req);

		if (!fieldsValidator.isValid) {
			callback(new Error(fieldsValidator.errMsg), false);
		} else if (!isFileTypeAllowed(file)) {
			callback(new Error('only images are allowed'), false);
		} else {
			callback(null, true);
		}
	}
}).single('file');

const areFormFieldsValid = (req) => {
	const obj = { isValid: true, errMsg: '' };

	switch (req.header('x-bucket-type')) {
		case 'post':
		case 'profile':
			break;
		default:
			obj.isValid = false;
			obj.errMsg = 'proper bucket type required';

			break;
	}

	return obj;
};

const isFileTypeAllowed = (file) => {
	const allowedFileTypes = ['image/png', 'image/jpg', 'image/jpeg'];

	return allowedFileTypes.includes(file.mimetype);
};

const imageUploadHandler = (req, res, next) => {
	upload(req, res, (err) => {
		if (err) {
			return res
				.status(404)
				.json({ type: ResponseTypes.ERROR, errors: [{ msg: err.message }] });
		}

		next();
	});
};

module.exports = imageUploadHandler;

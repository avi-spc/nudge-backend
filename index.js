const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const cors = require('cors');

const { ConnectDB } = require('./config/db');

const app = express();

app.use(express.json({ extended: false }));
app.use(cors());
app.use(methodOverride('_method'));

ConnectDB();

app.get('/', (req, res) => res.send('API running'));

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/notifications', require('./routes/api/notifications'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));

if (process.env.NODE_ENV === 'production') {
	// Set a static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});

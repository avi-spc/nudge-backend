const express = require('express');
const ConnectDB = require('./config/db');

const app = express();

app.use(express.json({ extended: false }));

ConnectDB();

app.get('/', (req, res) => res.send('API running'));

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});

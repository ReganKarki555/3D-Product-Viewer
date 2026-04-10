const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/health', (req, res) => {
	res.json({ status: 'ok' });
});

app.listen(port, () => {
	console.log(`Backend server running on http://localhost:${port}`);
});

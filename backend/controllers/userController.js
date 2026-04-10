const bcrypt = require('bcryptjs');
const db = require('../config/db');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const registerUser = async (req, res) => {
	const { username, email, password, phoneNumber } = req.body;
	const normalizedUsername = typeof username === 'string' ? username.trim() : '';
	const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
	const normalizedPhoneNumber = typeof phoneNumber === 'string' ? phoneNumber.trim() : '';

	if (!normalizedUsername || !normalizedEmail || !password) {
		return res.status(400).json({ message: 'Username, email, and password are required.' });
	}

	if (!emailRegex.test(normalizedEmail)) {
		return res.status(400).json({ message: 'Please provide a valid email address.' });
	}

	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		db.get(
			'SELECT id FROM users WHERE email = ? OR username = ?',
			[normalizedEmail, normalizedUsername],
			(selectError, existingUser) => {
				if (selectError) {
					console.error('Failed to check existing user:', selectError.message);
					return res.status(500).json({ message: 'Failed to register user.' });
				}

				if (existingUser) {
					return res.status(409).json({ message: 'Email or username is already registered.' });
				}

				db.run(
					'INSERT INTO users (username, email, password, phoneNumber) VALUES (?, ?, ?, ?)',
					[
						normalizedUsername,
						normalizedEmail,
						hashedPassword,
						normalizedPhoneNumber || null,
					],
					function insertUser(insertError) {
						if (insertError) {
							console.error('Failed to insert user:', insertError.message);
							return res.status(500).json({ message: 'Failed to register user.' });
						}

						return res.status(201).json({
							message: 'Registration successful.',
							user: {
								id: this.lastID,
								username: normalizedUsername,
								email: normalizedEmail,
								phoneNumber: normalizedPhoneNumber || null,
							},
						});
					}
				);
			}
		);
	} catch (error) {
		console.error('Failed to hash password:', error.message);
		return res.status(500).json({ message: 'Failed to register user.' });
	}
};

module.exports = {
	registerUser,
};

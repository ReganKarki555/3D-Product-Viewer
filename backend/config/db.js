const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dataDirectory = path.join(__dirname, '..', 'data');
const databasePath = path.join(dataDirectory, 'users.db');

fs.mkdirSync(dataDirectory, { recursive: true });

const db = new sqlite3.Database(databasePath, (error) => {
	if (error) {
		console.error('Failed to connect to SQLite database:', error.message);
		return;
	}

	console.log(`Connected to SQLite database at ${databasePath}`);
});

db.serialize(() => {
	db.run(
		`CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			username TEXT NOT NULL UNIQUE,
			email TEXT NOT NULL UNIQUE,
			password TEXT NOT NULL,
			phoneNumber TEXT,
			createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
		)`
	);
});

module.exports = db;

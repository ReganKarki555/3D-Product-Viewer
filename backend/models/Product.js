const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../data/products.db');
const db = new sqlite3.Database(dbPath);

const initializeProductsDb = () => {
	db.serialize(() => {
		db.run(`
			CREATE TABLE IF NOT EXISTS products (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				name TEXT NOT NULL,
				description TEXT,
				category TEXT,
				imageUrl TEXT,
				modelUrl TEXT,
				price REAL,
				views INTEGER DEFAULT 0,
				createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
				updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
			)
		`);
	});
};

const createProduct = (productData, callback) => {
	const { name, description, category, imageUrl, modelUrl, price } = productData;
	db.run(
		`INSERT INTO products (name, description, category, imageUrl, modelUrl, price) 
		 VALUES (?, ?, ?, ?, ?, ?)`,
		[name, description, category, imageUrl, modelUrl, price],
		function (err) {
			if (err) callback(err);
			else callback(null, { id: this.lastID });
		}
	);
};

const getProducts = (callback) => {
	db.all(`SELECT * FROM products ORDER BY createdAt DESC`, (err, rows) => {
		if (err) callback(err);
		else callback(null, rows);
	});
};

const getProductById = (id, callback) => {
	db.get(`SELECT * FROM products WHERE id = ?`, [id], (err, row) => {
		if (err) callback(err);
		else callback(null, row);
	});
};

const searchProducts = (query, callback) => {
	db.all(
		`SELECT * FROM products WHERE name LIKE ? OR description LIKE ? OR category LIKE ? ORDER BY createdAt DESC`,
		[`%${query}%`, `%${query}%`, `%${query}%`],
		(err, rows) => {
			if (err) callback(err);
			else callback(null, rows);
		}
	);
};

const getProductsByCategory = (category, callback) => {
	db.all(
		`SELECT * FROM products WHERE category = ? ORDER BY createdAt DESC`,
		[category],
		(err, rows) => {
			if (err) callback(err);
			else callback(null, rows);
		}
	);
};

const incrementViews = (id, callback) => {
	db.run(`UPDATE products SET views = views + 1 WHERE id = ?`, [id], (err) => {
		if (err) callback(err);
		else callback(null);
	});
};

const updateProduct = (id, productData, callback) => {
	const { name, description, category, imageUrl, modelUrl, price } = productData;
	db.run(
		`UPDATE products SET name = ?, description = ?, category = ?, imageUrl = ?, modelUrl = ?, price = ?, updatedAt = CURRENT_TIMESTAMP 
		 WHERE id = ?`,
		[name, description, category, imageUrl, modelUrl, price, id],
		(err) => {
			if (err) callback(err);
			else callback(null);
		}
	);
};

const deleteProduct = (id, callback) => {
	db.run(`DELETE FROM products WHERE id = ?`, [id], (err) => {
		if (err) callback(err);
		else callback(null);
	});
};

module.exports = {
	db,
	initializeProductsDb,
	createProduct,
	getProducts,
	getProductById,
	searchProducts,
	getProductsByCategory,
	incrementViews,
	updateProduct,
	deleteProduct,
};

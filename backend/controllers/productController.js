const {
	createProduct,
	getProducts,
	getProductById,
	searchProducts,
	getProductsByCategory,
	incrementViews,
	updateProduct,
	deleteProduct,
} = require('../models/Product');

const getAllProducts = (req, res) => {
	getProducts((err, products) => {
		if (err) {
			res.status(500).json({ error: 'Failed to fetch products' });
		} else {
			res.json(products || []);
		}
	});
};

const getProduct = (req, res) => {
	const { id } = req.params;
	getProductById(id, (err, product) => {
		if (err) {
			res.status(500).json({ error: 'Failed to fetch product' });
		} else if (!product) {
			res.status(404).json({ error: 'Product not found' });
		} else {
			incrementViews(id, () => {
				res.json(product);
			});
		}
	});
};

const searchProduct = (req, res) => {
	const { q } = req.query;
	if (!q) {
		return getAllProducts(req, res);
	}
	searchProducts(q, (err, products) => {
		if (err) {
			res.status(500).json({ error: 'Failed to search products' });
		} else {
			res.json(products || []);
		}
	});
};

const getByCategory = (req, res) => {
	const { category } = req.query;
	if (!category) {
		return getAllProducts(req, res);
	}
	getProductsByCategory(category, (err, products) => {
		if (err) {
			res.status(500).json({ error: 'Failed to fetch products by category' });
		} else {
			res.json(products || []);
		}
	});
};

const createNewProduct = (req, res) => {
	const { name, description, category, imageUrl, modelUrl, price } = req.body;

	if (!name || !description || !category) {
		return res.status(400).json({ error: 'Missing required fields' });
	}

	createProduct(
		{ name, description, category, imageUrl, modelUrl, price },
		(err, result) => {
			if (err) {
				res.status(500).json({ error: 'Failed to create product' });
			} else {
				res.status(201).json({ message: 'Product created', ...result });
			}
		}
	);
};

const updateExistingProduct = (req, res) => {
	const { id } = req.params;
	const { name, description, category, imageUrl, modelUrl, price } = req.body;

	updateProduct(id, { name, description, category, imageUrl, modelUrl, price }, (err) => {
		if (err) {
			res.status(500).json({ error: 'Failed to update product' });
		} else {
			res.json({ message: 'Product updated' });
		}
	});
};

const deleteExistingProduct = (req, res) => {
	const { id } = req.params;
	deleteProduct(id, (err) => {
		if (err) {
			res.status(500).json({ error: 'Failed to delete product' });
		} else {
			res.json({ message: 'Product deleted' });
		}
	});
};

module.exports = {
	getAllProducts,
	getProduct,
	searchProduct,
	getByCategory,
	createNewProduct,
	updateExistingProduct,
	deleteExistingProduct,
};

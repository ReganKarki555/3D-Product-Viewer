const express = require('express');
const {
	getAllProducts,
	getProduct,
	searchProduct,
	getByCategory,
	createNewProduct,
	updateExistingProduct,
	deleteExistingProduct,
} = require('../controllers/productController');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/search', searchProduct);
router.get('/category', getByCategory);
router.post('/', createNewProduct);
router.get('/:id', getProduct);
router.put('/:id', updateExistingProduct);
router.delete('/:id', deleteExistingProduct);

module.exports = router;

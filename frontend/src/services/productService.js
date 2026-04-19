const API_BASE_URL = 'http://localhost:5000/api/products';

export const productService = {
	getAllProducts: async () => {
		try {
			const response = await fetch(`${API_BASE_URL}/`);
			if (!response.ok) throw new Error('Failed to fetch products');
			return await response.json();
		} catch (error) {
			console.error('Error fetching products:', error);
			return [];
		}
	},

	getProductById: async (id) => {
		try {
			const response = await fetch(`${API_BASE_URL}/${id}`);
			if (!response.ok) throw new Error('Failed to fetch product');
			return await response.json();
		} catch (error) {
			console.error('Error fetching product:', error);
			return null;
		}
	},

	searchProducts: async (query) => {
		try {
			const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
			if (!response.ok) throw new Error('Failed to search products');
			return await response.json();
		} catch (error) {
			console.error('Error searching products:', error);
			return [];
		}
	},

	getProductsByCategory: async (category) => {
		try {
			const response = await fetch(`${API_BASE_URL}/category?category=${encodeURIComponent(category)}`);
			if (!response.ok) throw new Error('Failed to fetch products by category');
			return await response.json();
		} catch (error) {
			console.error('Error fetching products by category:', error);
			return [];
		}
	},

	createProduct: async (productData) => {
		try {
			const response = await fetch(`${API_BASE_URL}/`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(productData),
			});
			if (!response.ok) throw new Error('Failed to create product');
			return await response.json();
		} catch (error) {
			console.error('Error creating product:', error);
			return null;
		}
	},

	updateProduct: async (id, productData) => {
		try {
			const response = await fetch(`${API_BASE_URL}/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(productData),
			});
			if (!response.ok) throw new Error('Failed to update product');
			return await response.json();
		} catch (error) {
			console.error('Error updating product:', error);
			return null;
		}
	},

	deleteProduct: async (id) => {
		try {
			const response = await fetch(`${API_BASE_URL}/${id}`, {
				method: 'DELETE',
			});
			if (!response.ok) throw new Error('Failed to delete product');
			return await response.json();
		} catch (error) {
			console.error('Error deleting product:', error);
			return null;
		}
	},
};

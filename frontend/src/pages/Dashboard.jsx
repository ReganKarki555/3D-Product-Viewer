import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import ProductCard from '../components/common/ProductCard';
import SearchBar from '../components/common/SearchBar';

function Dashboard({ user, onLogout }) {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [searchActive, setSearchActive] = useState(false);

	// Fetch all products on mount
	useEffect(() => {
		const loadProducts = async () => {
			setLoading(true);
			const data = await productService.getAllProducts();
			setProducts(data);
			setFilteredProducts(data);
			setLoading(false);
		};
		loadProducts();
	}, []);

	const handleSearch = async (query) => {
		if (!query.trim()) {
			setFilteredProducts(products);
			setSearchActive(false);
			return;
		}
		setSearchActive(true);
		const results = await productService.searchProducts(query);
		setFilteredProducts(results);
	};

	const handleCategoryFilter = async (category) => {
		if (!category) {
			setFilteredProducts(products);
			setSearchActive(false);
			return;
		}
		setSearchActive(true);
		const results = await productService.getProductsByCategory(category);
		setFilteredProducts(results);
	};

	const handleProductClick = (productId) => {
		setSelectedProduct(productId);
	};

	const handleSampleData = async () => {
		const sampleProducts = [
			{
				name: 'Premium Gaming Headset',
				description: 'High-quality 3D model of a professional gaming headset with detailed textures',
				category: 'Electronics',
				imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=320&h=180&fit=crop',
				modelUrl: 'model1.glb',
				price: 99.99,
			},
			{
				name: 'Modern Office Chair',
				description: 'Ergonomic 3D model of a contemporary office chair for visualizations',
				category: 'Furniture',
				imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=320&h=180&fit=crop',
				modelUrl: 'model2.glb',
				price: 299.99,
			},
			{
				name: 'Luxury Sports Car',
				description: 'Detailed 3D model of a high-performance luxury sports car',
				category: 'Vehicles',
				imageUrl: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=320&h=180&fit=crop',
				modelUrl: 'model3.glb',
				price: 1999.99,
			},
			{
				name: 'Abstract Sculpture',
				description: 'Contemporary 3D art sculpture with metallic finish and complex geometry',
				category: 'Art',
				imageUrl: 'https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=320&h=180&fit=crop',
				modelUrl: 'model4.glb',
				price: 499.99,
			},
			{
				name: 'Diamond Ring',
				description: 'Exquisite 3D model of a luxury diamond engagement ring with gold band',
				category: 'Jewelry',
				imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=320&h=180&fit=crop',
				modelUrl: 'model5.glb',
				price: 2499.99,
			},
			{
				name: 'Designer Sneakers',
				description: 'Premium 3D model of limited edition designer athletic sneakers',
				category: 'Fashion',
				imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=320&h=180&fit=crop',
				modelUrl: 'model6.glb',
				price: 149.99,
			},
			{
				name: 'Smartwatch Pro',
				description: 'High-resolution 3D model of the latest flagship smartwatch with all features',
				category: 'Electronics',
				imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=320&h=180&fit=crop',
				modelUrl: 'model7.glb',
				price: 399.99,
			},
			{
				name: 'Marble Coffee Table',
				description: 'Elegant 3D design of a luxury marble top coffee table with metal frame',
				category: 'Furniture',
				imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=320&h=180&fit=crop',
				modelUrl: 'model8.glb',
				price: 799.99,
			},
		];

		for (const product of sampleProducts) {
			await productService.createProduct(product);
		}

		const data = await productService.getAllProducts();
		setProducts(data);
		setFilteredProducts(data);
	};

	return (
		<div className="min-h-screen bg-gray-950 text-white">
			{/* Header/Navbar */}
			<header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 shadow-lg">
				<div className="px-6 py-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xl font-bold">
							3D
						</div>
						<h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
							3D Viewer
						</h1>
					</div>

					<div className="flex items-center gap-4">
						<span className="text-gray-400 text-sm">
							Welcome, <span className="text-blue-400 font-semibold">{user?.username}</span>
						</span>
						<button
							onClick={onLogout}
							className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
						>
							Logout
						</button>
					</div>
				</div>
			</header>

			{/* Search and Filter Bar */}
			<SearchBar onSearch={handleSearch} onCategoryFilter={handleCategoryFilter} />

			{/* Main Content */}
			<main className="px-6 py-8">
				{/* Add Sample Data Button (only show if no products) */}
				{products.length === 0 && (
					<div className="mb-8 text-center">
						<p className="text-gray-400 mb-4">No products yet. Add sample data to get started!</p>
						<button
							onClick={handleSampleData}
							className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
						>
							Load Sample Products
						</button>
					</div>
				)}

				{/* Loading State */}
				{loading && (
					<div className="flex justify-center items-center py-20">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
					</div>
				)}

				{/* No Results State */}
				{!loading && filteredProducts.length === 0 && (
					<div className="text-center py-20">
						<p className="text-gray-400 text-lg">
							{searchActive ? 'No products found. Try a different search.' : 'No products available.'}
						</p>
					</div>
				)}

				{/* Products Grid */}
				{!loading && filteredProducts.length > 0 && (
					<div>
						<h2 className="text-3xl font-bold mb-6">
							{searchActive ? 'Search Results' : 'Featured 3D Products'}
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
							{filteredProducts.map((product) => (
								<ProductCard
									key={product.id}
									product={product}
									onProductClick={handleProductClick}
								/>
							))}
						</div>
					</div>
				)}
			</main>
		</div>
	);
}

export default Dashboard;

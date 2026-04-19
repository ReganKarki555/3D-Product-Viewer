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
		<div className="page-shell home-page">
			{/* Header/Navbar */}
			<header className="topbar">
				<div className="brand">3D Product Viewer</div>

				<nav className="nav" aria-label="Dashboard Navigation">
					<a className="nav-link" href="#dashboard">Dashboard</a>
					<a className="nav-link" href="#products">Products</a>
					<a className="nav-link" href="#explore">Explore</a>
				</nav>

				<div className="auth-actions">
					<span className="eyebrow" style={{ margin: 0, color: '#b6c4f5' }}>
						Welcome, <span style={{ color: '#2ce1ff' }}>{user?.username}</span>
					</span>
					<button
						onClick={onLogout}
						className="button button-secondary"
						style={{ borderColor: 'rgba(142, 180, 255, 0.55)', color: '#f4f8ff' }}
					>
						Logout
					</button>
				</div>
			</header>

			{/* Main Content */}
			<main className="home-sections">
				{/* Hero Section */}
				<section className="hero section-panel" id="dashboard">
					<p className="eyebrow">Welcome back</p>
					<h1>Explore Your 3D Collection</h1>
					<p className="hero-copy">
						Discover, search, and interact with stunning 3D models. Browse through our curated
						collection of products across multiple categories.
					</p>

					<div className="hero-3d-stage" role="img" aria-label="3D product collection preview">
						<div className="hero-3d-frame">
							<img className="hero-3d-image hero-3d-base" src="/bg.png" alt="3D product artwork" />
						</div>
						<img className="hero-3d-image hero-3d-pop" src="/bg.png" alt="" aria-hidden="true" />
					</div>
				</section>

				{/* Search Section */}
				<section className="section-panel section-works" id="products">
					<div className="section-heading-wrap">
						<p className="eyebrow">Find & Discover</p>
						<h2>Search and filter 3D products</h2>
					</div>
					
					<SearchBar onSearch={handleSearch} onCategoryFilter={handleCategoryFilter} />

					{/* Add Sample Data Button */}
					{products.length === 0 && (
						<div style={{ textAlign: 'center', marginTop: '24px' }}>
							<p className="hero-copy" style={{ color: '#b6c4f5' }}>
								No products yet. Load sample data to get started!
							</p>
							<button
								onClick={handleSampleData}
								className="button button-primary"
								style={{
									background: 'linear-gradient(120deg, #2ce1ff 0%, #6a8eff 100%)',
									color: '#051124',
									marginTop: '12px',
								}}
							>
								Load Sample Products
							</button>
						</div>
					)}
				</section>

				{/* Products Grid Section */}
				{!loading && filteredProducts.length > 0 && (
					<section className="section-panel section-showcase" id="explore">
						<div className="section-heading-wrap">
							<p className="eyebrow">{searchActive ? 'Search Results' : '3D Products'}</p>
							<h2>{searchActive ? `Found ${filteredProducts.length} products` : 'Featured 3D Collection'}</h2>
						</div>

						{/* Loading State */}
						{loading && (
							<div style={{ textAlign: 'center', padding: '40px' }}>
								<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" style={{ margin: '0 auto' }}></div>
							</div>
						)}

						{/* Products Grid */}
						<div className="showcase-grid">
							{filteredProducts.map((product) => (
								<article
									key={product.id}
									className="product-tile"
									onClick={() => handleProductClick(product.id)}
									style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
									onMouseEnter={(e) => {
										e.currentTarget.style.transform = 'translateY(-4px)';
										e.currentTarget.style.boxShadow = '0 12px 24px rgba(44, 225, 255, 0.2)';
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.transform = 'translateY(0)';
										e.currentTarget.style.boxShadow = 'none';
									}}
								>
									<div
										style={{
											width: '100%',
											height: '200px',
											borderRadius: '12px',
											marginBottom: '12px',
											overflow: 'hidden',
											border: '1px solid rgba(132, 165, 255, 0.3)',
										}}
									>
										<img
											src={product.imageUrl || 'https://via.placeholder.com/320x180?text=3D+Product'}
											alt={product.name}
											style={{
												width: '100%',
												height: '100%',
												objectFit: 'cover',
											}}
										/>
									</div>
									<p className="product-tag">{product.category}</p>
									<h3>{product.name}</h3>
									<p style={{ color: '#b6c4f5', fontSize: '0.9rem', margin: '6px 0 0' }}>
										${product.price?.toFixed(2)} • {product.views || 0} views
									</p>
								</article>
							))}
						</div>
					</section>
				)}

				{/* No Results State */}
				{!loading && filteredProducts.length === 0 && products.length > 0 && (
					<section className="section-panel section-showcase" id="explore">
						<div style={{ textAlign: 'center', padding: '80px 20px' }}>
							<h2 style={{ color: '#f6f8ff', marginBottom: '12px' }}>No products found</h2>
							<p className="hero-copy">Try a different search or adjust your filters</p>
						</div>
					</section>
				)}
			</main>
		</div>
	);
}

export default Dashboard;

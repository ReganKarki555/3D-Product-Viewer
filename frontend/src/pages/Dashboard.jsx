import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import SearchBar from '../components/common/SearchBar';
import ProductScene from '../components/3D/ProductScene';

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

	const handleCloseProductDetails = () => {
		setSelectedProduct(null);
	};

	const selectedProductData =
		filteredProducts.find((product) => product.id === selectedProduct) ||
		products.find((product) => product.id === selectedProduct);

	const handleSampleData = async () => {
		const sampleProducts = [
			{
				name: 'Nike Shoes',
				description: 'Stylish Nike sneaker card with a clean 3D presentation and premium streetwear look',
				category: 'Fashion',
				imageUrl: '/nike.png',
				modelUrl: 'nike-shoes.glb',
				price: 149.99,
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
					<span className="eyebrow" style={{ margin: 0, color: '#64748b' }}>
						Welcome, <span style={{ color: '#2563eb' }}>{user?.username}</span>
					</span>
					<button
						onClick={onLogout}
						className="button button-secondary"
						style={{ borderColor: '#dbe4f0', color: '#0f172a' }}
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
							<p className="hero-copy" style={{ color: '#64748b' }}>
								No products yet. Load sample data to get started!
							</p>
							<button
								onClick={handleSampleData}
								className="button button-primary"
								style={{
									background: 'linear-gradient(120deg, #2563eb 0%, #0ea5e9 100%)',
									color: '#ffffff',
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
							{filteredProducts.map((product, index) => (
								<article
									key={product.id}
									className="product-tile"
									onClick={() => handleProductClick(product.id)}
								>
									{index === 0 && product.imageUrl ? (
										<ProductScene
											src={product.imageUrl}
											alt={product.name}
											title={product.name}
											subtitle="Move your mouse to tilt the shoe and reveal a stronger 3D illusion."
											badge={product.category}
										/>
									) : (
										<div className="product-tile-media product-tile-media--image">
											<img
												src={product.imageUrl || 'https://via.placeholder.com/320x180?text=3D+Product'}
												alt={product.name}
												className="product-tile-image"
											/>
											<div className="product-tile-media-overlay">
												<span>View 3D</span>
												<span>Drag / Inspect</span>
											</div>
										</div>
									)}
									<p className="product-tag">{product.category}</p>
									{index !== 0 && (
										<div className="product-tile-copy">
											<h3>{product.name}</h3>
											<p>
												${product.price?.toFixed(2)} • {product.views || 0} views
											</p>
										</div>
									)}
								</article>
							))}
						</div>
					</section>
				)}

				{/* No Results State */}
				{!loading && filteredProducts.length === 0 && products.length > 0 && (
					<section className="section-panel section-showcase" id="explore">
						<div style={{ textAlign: 'center', padding: '80px 20px' }}>
							<h2 style={{ color: '#0f172a', marginBottom: '12px' }}>No products found</h2>
							<p className="hero-copy">Try a different search or adjust your filters</p>
						</div>
					</section>
				)}
			</main>

			{selectedProductData && (
				<div
					role="dialog"
					aria-modal="true"
					aria-labelledby="product-details-title"
					onClick={handleCloseProductDetails}
					style={{
						position: 'fixed',
						inset: 0,
						background: 'rgba(15, 23, 42, 0.32)',
						display: 'grid',
						placeItems: 'center',
						padding: '20px',
						zIndex: 50,
					}}
				>
					<div
						onClick={(event) => event.stopPropagation()}
						style={{
							width: 'min(760px, 100%)',
							maxHeight: '90vh',
							overflowY: 'auto',
							borderRadius: '18px',
							border: '1px solid #dbe4f0',
							background: '#ffffff',
							boxShadow: '0 24px 60px rgba(15, 23, 42, 0.2)',
							padding: '22px',
						}}
					>
						<div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'start' }}>
							<div>
								<p className="product-tag" style={{ marginTop: 0 }}>{selectedProductData.category}</p>
								<h2 id="product-details-title" style={{ margin: '0 0 6px', color: '#0f172a' }}>
									{selectedProductData.name}
								</h2>
								<p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem' }}>
									${selectedProductData.price?.toFixed(2)} • {selectedProductData.views || 0} views
								</p>
							</div>
							<button
								type="button"
								onClick={handleCloseProductDetails}
								className="button button-secondary"
								style={{ minWidth: 'auto', padding: '8px 12px' }}
							>
								Close
							</button>
						</div>

						<div
							style={{
								marginTop: '16px',
								borderRadius: '14px',
								overflow: 'hidden',
								border: '1px solid #dbe4f0',
								height: '280px',
							}}
						>
							<img
								src={selectedProductData.imageUrl || 'https://via.placeholder.com/640x360?text=3D+Product'}
								alt={selectedProductData.name}
								style={{ width: '100%', height: '100%', objectFit: 'cover' }}
							/>
						</div>

						<div style={{ marginTop: '16px', color: '#334155', lineHeight: 1.7 }}>
							<p style={{ margin: '0 0 10px' }}>{selectedProductData.description}</p>
							{selectedProductData.name === 'Premium Gaming Headset' && (
								<div
									style={{
										border: '1px solid #dbe4f0',
										borderRadius: '12px',
										background: '#f8fafc',
										padding: '14px',
									}}
								>
									<h3 style={{ margin: '0 0 8px', color: '#0f172a', fontSize: '1rem' }}>Detailed Info</h3>
									<p style={{ margin: '0 0 8px' }}>
										Premium Gaming Headset is crafted for immersive gameplay with accurate positional
										audio and premium build details in this 3D model.
									</p>
									<ul style={{ margin: 0, paddingLeft: '18px' }}>
										<li>Studio-grade over-ear design with cushioned headband.</li>
										<li>Noise-isolating ear cups and detailed surface textures.</li>
										<li>Ideal for product demos, gaming mockups, and catalog previews.</li>
									</ul>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Dashboard;

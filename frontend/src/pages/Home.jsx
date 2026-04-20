import ProductScene from '../components/3D/ProductScene';

const navItems = [
	{ label: 'Home', href: '#home' },
	{ label: 'How It Works', href: '#how-it-works' },
	{ label: '3D Views', href: '#showcase' }
];

const workflowSteps = [
	{ title: 'Pick a Product', detail: 'Choose from cars, houses, earth, and more.' },
	{ title: 'Open 3D View', detail: 'Load the model instantly in your browser.' },
	{ title: 'Explore Angles', detail: 'Rotate, zoom, and inspect every detail.' }
];

const products = [
	{ name: 'Nike Shoes', tag: 'Athletic Footwear', color: 'swatch-blue', imageUrl: '/nike.png' },
	{ name: 'House', tag: 'Architecture', color: 'swatch-amber' },
	{ name: 'Earth', tag: 'Planet Model', color: 'swatch-blue' },
	{ name: 'Furniture', tag: 'Interior Setup', color: 'swatch-green' }
];

function Home({ onLoginClick, onRegisterClick }) {
	return (
		<div className="page-shell home-page">
			<header className="topbar">
				<div className="brand">3D Product Viewer</div>

				<nav className="nav" aria-label="Primary">
					{navItems.map((item) => (
						<a key={item.label} className="nav-link" href={item.href}>
							{item.label}
						</a>
					))}
				</nav>

				<div className="auth-actions">
					<button className="button button-secondary" type="button" onClick={onLoginClick}>
						Login
					</button>
					<button className="button button-primary" type="button" onClick={onRegisterClick}>
						Register
					</button>
				</div>
			</header>

			<main className="home-sections">
				<section className="hero section-panel" id="home">
					<p className="eyebrow">Minimal storefront</p>
					<h1>Simple product browsing, built to start clean.</h1>
					<p className="hero-copy">
						This viewer gives a clear starting point for exploring products in 3D with a
						lightweight interface and easy navigation.
					</p>

					<div className="hero-3d-stage" role="img" aria-label="3D background preview">
						<div className="hero-3d-frame">
							<img className="hero-3d-image hero-3d-base" src="/bg.png" alt="3D product artwork" />
						</div>
						<img className="hero-3d-image hero-3d-pop" src="/bg.png" alt="" aria-hidden="true" />
					</div>
				</section>

				<section className="section-panel section-works" id="how-it-works">
					<div className="section-heading-wrap">
						<p className="eyebrow">How It Works</p>
						<h2>Three quick steps to explore any model</h2>
					</div>
					<div className="workflow-grid" aria-label="How it works workflow">
						{workflowSteps.map((step, index) => (
							<article key={step.title} className="workflow-card">
								<p className="workflow-index">0{index + 1}</p>
								<h3>{step.title}</h3>
								<p>{step.detail}</p>
							</article>
						))}
					</div>
				</section>

				<section className="section-panel section-showcase" id="showcase">
					<div className="section-heading-wrap">
						<p className="eyebrow">3D Views</p>
						<h2>Available product categories to preview in 3D</h2>
					</div>
					<div className="showcase-grid">
						{products.map((product, index) => (
							<article key={product.name} className="product-tile">
								{index === 0 && product.imageUrl ? (
									<ProductScene
										src={product.imageUrl}
										alt={product.name}
										title={product.name}
										subtitle="Move your mouse to tilt the shoe and reveal a stronger 3D illusion."
										badge={product.tag}
									/>
								) : product.imageUrl ? (
									<div className="product-tile-media product-tile-media--image">
										<img className="product-tile-image" src={product.imageUrl} alt={product.name} />
										<div className="product-tile-media-overlay">
											<span>View 3D</span>
											<span>Drag / Inspect</span>
										</div>
									</div>
								) : (
									<div className={`product-tile-media product-tile-media--swatch model-swatch ${product.color}`} aria-hidden="true" />
								)}
								{index !== 0 && <p className="product-tag">{product.tag}</p>}
								{index !== 0 && (
									<div className="product-tile-copy">
										<h3>{product.name}</h3>
										<p>Hover to preview the collection with a lifted, glassy motion.</p>
									</div>
								)}
							</article>
						))}
					</div>
				</section>
			</main>
		</div>
	);
}

export default Home;

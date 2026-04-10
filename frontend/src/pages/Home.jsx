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
	{ name: 'Cars', tag: 'Auto Collection', color: 'swatch-red' },
	{ name: 'House', tag: 'Architecture', color: 'swatch-amber' },
	{ name: 'Earth', tag: 'Planet Model', color: 'swatch-blue' },
	{ name: 'Furniture', tag: 'Interior Setup', color: 'swatch-green' }
];

function Home({ onLoginClick, onRegisterClick }) {
	return (
		<div className="page-shell">
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
						{products.map((product) => (
							<article key={product.name} className="product-tile">
								<div className={`model-swatch ${product.color}`} aria-hidden="true" />
								<p className="product-tag">{product.tag}</p>
								<h3>{product.name}</h3>
							</article>
						))}
					</div>
				</section>
			</main>
		</div>
	);
}

export default Home;

const navItems = ['Home', 'Collections', 'Discover More', 'About Us'];

function Home() {
	return (
		<div className="page-shell">
			<header className="topbar">
				<div className="brand">3D Product Viewer</div>

				<nav className="nav" aria-label="Primary">
					{navItems.map((item) => (
						<a key={item} className="nav-link" href="#home">
							{item}
						</a>
					))}
				</nav>

				<div className="auth-actions">
					<a className="button button-secondary" href="#login">
						Login
					</a>
					<a className="button button-primary" href="#register">
						Register
					</a>
				</div>
			</header>

			<main className="hero" id="home">
				<p className="eyebrow">Minimal storefront</p>
				<h1>Simple product browsing, built to start clean.</h1>
				<p className="hero-copy">
					This is the basic landing page structure for the site with only the core
					navigation and account actions.
				</p>
			</main>
		</div>
	);
}

export default Home;

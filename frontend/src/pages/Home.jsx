const navItems = ['Home', 'Collections', 'Discover More', 'About Us'];

function Home({ onLoginClick, onRegisterClick }) {
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
					<button className="button button-secondary" type="button" onClick={onLoginClick}>
						Login
					</button>
					<button className="button button-primary" type="button" onClick={onRegisterClick}>
						Register
					</button>
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

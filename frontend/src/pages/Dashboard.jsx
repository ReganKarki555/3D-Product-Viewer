function Dashboard({ user, onLogout }) {
	const userJoinedOn = new Date().toLocaleDateString();

	return (
		<div className="page-shell">
			<header className="topbar">
				<div className="brand">3D Product Viewer</div>
				<div className="auth-actions">
					<button className="button button-secondary" type="button" onClick={onLogout}>
						Logout
					</button>
				</div>
			</header>

			<main className="dashboard-main">
				<section className="dashboard-card" aria-labelledby="dashboard-title">
					<p className="eyebrow">Dashboard</p>
					<h1 id="dashboard-title">Welcome back, {user?.username || 'User'}.</h1>
					<p className="dashboard-subtitle">
						Your account is now active. You can review profile details and continue exploring 3D products.
					</p>

					<div className="dashboard-grid">
						<article className="dashboard-item">
							<h2>Username</h2>
							<p>{user?.username || '-'}</p>
						</article>
						<article className="dashboard-item">
							<h2>Email</h2>
							<p>{user?.email || '-'}</p>
						</article>
						<article className="dashboard-item">
							<h2>Phone Number</h2>
							<p>{user?.phoneNumber || 'Not provided'}</p>
						</article>
						<article className="dashboard-item">
							<h2>Account Status</h2>
							<p>Active</p>
						</article>
						<article className="dashboard-item">
							<h2>Role</h2>
							<p>User</p>
						</article>
						<article className="dashboard-item">
							<h2>Joined</h2>
							<p>{userJoinedOn}</p>
						</article>
					</div>

					<section className="dashboard-next" aria-label="Dashboard quick actions">
						<h2>Quick actions</h2>
						<div className="dashboard-next-grid">
							<div className="dashboard-note">
								<h3>View Products</h3>
								<p>Start browsing available 3D products from the home section.</p>
							</div>
							<div className="dashboard-note">
								<h3>Update Profile</h3>
								<p>Profile editing can be added next if you want users to manage account details.</p>
							</div>
						</div>
					</section>
				</section>
			</main>
		</div>
	);
}

export default Dashboard;

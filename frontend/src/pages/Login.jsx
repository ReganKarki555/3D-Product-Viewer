function Login({ onBack, onRegisterClick }) {
	return (
		<div className="page-shell">
			<header className="topbar">
				<div className="brand">3D Product Viewer</div>
				<div className="auth-actions">
					<button className="button button-secondary" type="button" onClick={onBack}>
						Back to Home
					</button>
					<button className="button button-primary" type="button" onClick={onRegisterClick}>
						Register
					</button>
				</div>
			</header>

			<main className="auth-main">
				<section className="auth-card" aria-labelledby="login-title">
					<h1 id="login-title">Login</h1>

					<form className="auth-form" onSubmit={(event) => event.preventDefault()}>
						<label className="form-label" htmlFor="email">
							Email:
						</label>
						<input className="form-input" id="email" name="email" type="email" autoComplete="email" />

						<label className="form-label" htmlFor="password">
							Password
						</label>
						<input
							className="form-input"
							id="password"
							name="password"
							type="password"
							autoComplete="current-password"
						/>

						<a className="forgot-link" href="#forgot-password">
							Forgot Password
						</a>

						<button className="button button-primary auth-submit" type="submit">
							Login
						</button>
					</form>
				</section>
			</main>
		</div>
	);
}

export default Login;

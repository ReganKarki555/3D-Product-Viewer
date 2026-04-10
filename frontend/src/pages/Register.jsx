function Register({ onBack, onLoginClick }) {
	return (
		<div className="page-shell">
			<header className="topbar">
				<div className="brand">3D Product Viewer</div>
				<div className="auth-actions">
					<button className="button button-secondary" type="button" onClick={onBack}>
						Back to Home
					</button>
					<button className="button button-primary" type="button" onClick={onLoginClick}>
						Login
					</button>
				</div>
			</header>

			<main className="auth-main">
				<section className="auth-card" aria-labelledby="register-title">
					<h1 id="register-title">Register</h1>

					<form className="auth-form" onSubmit={(event) => event.preventDefault()}>
						<label className="form-label" htmlFor="username">
							UserName
						</label>
						<input className="form-input" id="username" name="username" type="text" autoComplete="username" />

						<label className="form-label" htmlFor="register-email">
							Email
						</label>
						<input
							className="form-input"
							id="register-email"
							name="email"
							type="email"
							autoComplete="email"
						/>

						<label className="form-label" htmlFor="register-password">
							Password
						</label>
						<input
							className="form-input"
							id="register-password"
							name="password"
							type="password"
							autoComplete="new-password"
						/>

						<label className="form-label" htmlFor="confirm-password">
							Re-Enter Password
						</label>
						<input
							className="form-input"
							id="confirm-password"
							name="confirmPassword"
							type="password"
							autoComplete="new-password"
						/>

						<label className="form-label" htmlFor="phone-number">
							PhoneNumber (Optional)
						</label>
						<input
							className="form-input"
							id="phone-number"
							name="phoneNumber"
							type="tel"
							autoComplete="tel"
						/>

						<button className="button button-primary auth-submit" type="submit">
							Register
						</button>
					</form>
				</section>
			</main>
		</div>
	);
}

export default Register;

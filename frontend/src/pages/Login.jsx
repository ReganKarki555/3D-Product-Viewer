import { useState } from 'react';
import { loginUser } from '../services/authService';

function Login({ onBack, onRegisterClick, onLoginSuccess }) {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((previous) => ({ ...previous, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setErrorMessage('');

		if (!formData.email.trim() || !formData.password) {
			setErrorMessage('Email and password are required.');
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await loginUser({
				email: formData.email,
				password: formData.password,
			});

			setFormData({ email: '', password: '' });
			onLoginSuccess(response.user);
		} catch (error) {
			setErrorMessage(error.message || 'Login failed.');
		} finally {
			setIsSubmitting(false);
		}
	};

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

					<form className="auth-form" onSubmit={handleSubmit}>
						{errorMessage && <p className="form-message form-message-error">{errorMessage}</p>}

						<label className="form-label" htmlFor="email">
							Email:
						</label>
						<input
							className="form-input"
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							value={formData.email}
							onChange={handleInputChange}
							required
						/>

						<label className="form-label" htmlFor="password">
							Password
						</label>
						<input
							className="form-input"
							id="password"
							name="password"
							type="password"
							autoComplete="current-password"
							value={formData.password}
							onChange={handleInputChange}
							required
						/>

						<a className="forgot-link" href="#forgot-password">
							Forgot Password
						</a>

						<button className="button button-primary auth-submit" type="submit" disabled={isSubmitting}>
							{isSubmitting ? 'Logging in...' : 'Login'}
						</button>
					</form>
				</section>
			</main>
		</div>
	);
}

export default Login;

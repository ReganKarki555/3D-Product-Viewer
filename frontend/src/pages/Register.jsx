import { useState } from 'react';
import { registerUser } from '../services/authService';

function Register({ onBack, onLoginClick }) {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		phoneNumber: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((previous) => ({ ...previous, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setErrorMessage('');
		setSuccessMessage('');

		if (!formData.username.trim() || !formData.email.trim() || !formData.password) {
			setErrorMessage('Username, email, and password are required.');
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			setErrorMessage('Passwords do not match.');
			return;
		}

		setIsSubmitting(true);

		try {
			await registerUser({
				username: formData.username,
				email: formData.email,
				password: formData.password,
				phoneNumber: formData.phoneNumber,
			});

			setSuccessMessage('Registration successful. You can now log in.');
			setFormData({
				username: '',
				email: '',
				password: '',
				confirmPassword: '',
				phoneNumber: '',
			});
		} catch (error) {
			setErrorMessage(error.message || 'Registration failed.');
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
					<button className="button button-primary" type="button" onClick={onLoginClick}>
						Login
					</button>
				</div>
			</header>

			<main className="auth-main">
				<section className="auth-card" aria-labelledby="register-title">
					<h1 id="register-title">Register</h1>

					<form className="auth-form" onSubmit={handleSubmit}>
						{errorMessage && <p className="form-message form-message-error">{errorMessage}</p>}
						{successMessage && <p className="form-message form-message-success">{successMessage}</p>}

						<label className="form-label" htmlFor="username">
							UserName
						</label>
						<input
							className="form-input"
							id="username"
							name="username"
							type="text"
							autoComplete="username"
							value={formData.username}
							onChange={handleInputChange}
							required
						/>

						<label className="form-label" htmlFor="register-email">
							Email
						</label>
						<input
							className="form-input"
							id="register-email"
							name="email"
							type="email"
							autoComplete="email"
							value={formData.email}
							onChange={handleInputChange}
							required
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
							value={formData.password}
							onChange={handleInputChange}
							required
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
							value={formData.confirmPassword}
							onChange={handleInputChange}
							required
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
							value={formData.phoneNumber}
							onChange={handleInputChange}
						/>

						<button className="button button-primary auth-submit" type="submit" disabled={isSubmitting}>
							{isSubmitting ? 'Registering...' : 'Register'}
						</button>
					</form>
				</section>
			</main>
		</div>
	);
}

export default Register;

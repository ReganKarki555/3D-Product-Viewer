const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export async function registerUser(payload) {
	const response = await fetch(`${API_BASE_URL}/api/users/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});

	const rawText = await response.text();
	let data = {};

	if (rawText) {
		try {
			data = JSON.parse(rawText);
		} catch (error) {
			data = {};
		}
	}

	if (!response.ok) {
		throw new Error(data.message || 'Registration failed.');
	}

	return data;
}

export async function loginUser(payload) {
	const response = await fetch(`${API_BASE_URL}/api/users/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});

	const rawText = await response.text();
	let data = {};

	if (rawText) {
		try {
			data = JSON.parse(rawText);
		} catch (error) {
			data = {};
		}
	}

	if (!response.ok) {
		throw new Error(data.message || 'Login failed.');
	}

	return data;
}

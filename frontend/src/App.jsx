import { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

const USER_STORAGE_KEY = 'productViewerCurrentUser';

function getStoredUser() {
	try {
		const rawUser = window.localStorage.getItem(USER_STORAGE_KEY);
		return rawUser ? JSON.parse(rawUser) : null;
	} catch (error) {
		return null;
	}
}

function App() {
	const [currentUser, setCurrentUser] = useState(() => getStoredUser());
	const [activePage, setActivePage] = useState(() => (getStoredUser() ? 'dashboard' : 'home'));

	const handleLoginSuccess = (user) => {
		setCurrentUser(user);
		window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
		setActivePage('dashboard');
	};

	const handleLogout = () => {
		setCurrentUser(null);
		window.localStorage.removeItem(USER_STORAGE_KEY);
		setActivePage('home');
	};

	if (activePage === 'dashboard') {
		return <Dashboard user={currentUser} onLogout={handleLogout} />;
	}

	if (activePage === 'login') {
		return (
			<Login
				onBack={() => setActivePage('home')}
				onRegisterClick={() => setActivePage('register')}
				onLoginSuccess={handleLoginSuccess}
			/>
		);
	}

	if (activePage === 'register') {
		return <Register onBack={() => setActivePage('home')} onLoginClick={() => setActivePage('login')} />;
	}

	return <Home onLoginClick={() => setActivePage('login')} onRegisterClick={() => setActivePage('register')} />;
}

export default App;

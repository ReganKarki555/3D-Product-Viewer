import { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
	const [activePage, setActivePage] = useState('home');

	if (activePage === 'login') {
		return <Login onBack={() => setActivePage('home')} onRegisterClick={() => setActivePage('register')} />;
	}

	if (activePage === 'register') {
		return <Register onBack={() => setActivePage('home')} onLoginClick={() => setActivePage('login')} />;
	}

	return <Home onLoginClick={() => setActivePage('login')} onRegisterClick={() => setActivePage('register')} />;
}

export default App;

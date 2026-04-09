import { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
	const [activePage, setActivePage] = useState('home');

	if (activePage === 'login') {
		return <Login onBack={() => setActivePage('home')} />;
	}

	return <Home onLoginClick={() => setActivePage('login')} />;
}

export default App;

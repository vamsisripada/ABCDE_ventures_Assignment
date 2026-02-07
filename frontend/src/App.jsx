import { useState, useEffect } from 'react';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ItemList from './components/ItemList';
import Cart from './components/Cart';
import Orders from './components/Orders';
import api from './api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('items');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchCartCount();
    }
  }, []);

  const fetchCartCount = async () => {
    try {
      const response = await api.get('/carts');
      const count = response.data.items?.length || 0;
      setCartCount(count);
    } catch (err) {
      console.error('Error fetching cart count:', err);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    fetchCartCount();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('items');
    setCartCount(0);
  };

  const handleCartUpdate = () => {
    fetchCartCount();
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        cartCount={cartCount}
        onViewChange={setCurrentView}
        currentView={currentView}
        onLogout={handleLogout}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'items' && <ItemList onCartUpdate={handleCartUpdate} />}
        {currentView === 'cart' && <Cart onCartUpdate={handleCartUpdate} />}
        {currentView === 'orders' && <Orders />}
      </main>
    </div>
  );
}

export default App;

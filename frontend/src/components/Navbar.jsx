import { ShoppingCart, Package, LogOut, User } from 'lucide-react';
import api from '../api';

function Navbar({ cartCount, onViewChange, currentView, onLogout }) {
  const username = localStorage.getItem('username');

  const handleLogout = async () => {
    try {
      await api.post('/users/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      onLogout();
    } catch (err) {
      console.error('Logout error:', err);
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      onLogout();
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">ShopEase</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <User size={20} />
              <span className="font-medium">{username}</span>
            </div>

            <button
              onClick={() => onViewChange('items')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                currentView === 'items'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Shop
            </button>

            <button
              onClick={() => onViewChange('cart')}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 relative ${
                currentView === 'cart'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ShoppingCart size={20} />
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onViewChange('orders')}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                currentView === 'orders'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Package size={20} />
              Orders
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 transition flex items-center gap-2"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

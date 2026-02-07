import { useEffect, useState } from 'react';
import api from '../api';
import { Trash2, ShoppingBag, Loader } from 'lucide-react';

function Cart({ onCartUpdate }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await api.get('/carts');
      setCart(response.data);
      onCartUpdate();
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await api.delete(`/carts/${itemId}`);
      fetchCart();
    } catch (err) {
      alert('Error removing item from cart');
      console.error(err);
    }
  };

  const placeOrder = async () => {
    if (!cart || cart.items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setProcessing(true);
    try {
      await api.post('/orders');
      alert('Order placed successfully!');
      fetchCart();
    } catch (err) {
      alert('Error placing order');
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => {
      return total + (item.itemId.price * item.quantity);
    }, 0).toFixed(2);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin" size={48} />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600 text-lg">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h2>
      
      <div className="bg-white rounded-lg shadow-md">
        {cart.items.map((item) => (
          <div key={item._id} className="flex items-center gap-4 p-4 border-b last:border-b-0">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-3xl">🛍️</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{item.itemId.name}</h3>
              <p className="text-gray-600 text-sm">{item.itemId.description}</p>
              <p className="text-blue-600 font-semibold mt-1">${item.itemId.price} x {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-gray-800">
                ${(item.itemId.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item.itemId._id)}
                className="mt-2 text-red-500 hover:text-red-700 transition flex items-center gap-1"
              >
                <Trash2 size={16} />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold text-gray-800">Total:</span>
          <span className="text-3xl font-bold text-blue-600">${calculateTotal()}</span>
        </div>
        <button
          onClick={placeOrder}
          disabled={processing}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
        >
          {processing ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
}

export default Cart;

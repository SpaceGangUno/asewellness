import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CheckoutModal from './CheckoutModal';
import LotusIcon from './LotusIcon';

export default function Navbar() {
  const { items, total, clearCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const handlePaymentComplete = () => {
    clearCart();
    setIsCheckoutModalOpen(false);
    navigate('/');
    alert('Thank you for your purchase!');
  };

  return (
    <>
      <nav className="fixed w-full bg-black/80 backdrop-blur-md z-50 border-b border-emerald-900/30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center space-x-2">
              <LotusIcon className="h-6 w-6 text-emerald-400" />
              <span className="text-lg font-bold text-white">Asé Juices</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/benefits" className="text-gray-300 hover:text-white transition">Benefits</Link>
              <Link to="/products" className="text-gray-300 hover:text-white transition">Products</Link>
              <Link to="/process" className="text-gray-300 hover:text-white transition">Our Process</Link>
              <Link to="/portal" className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-500 transition flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Client Portal</span>
              </Link>
              <div className="relative">
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </button>

                {isCartOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-black/90 backdrop-blur-md rounded-lg shadow-lg p-4 animate-fade-in border border-emerald-900/30">
                    <h3 className="text-lg font-semibold text-white mb-4">Shopping Cart</h3>
                    {items.length === 0 ? (
                      <p className="text-gray-400">Your cart is empty</p>
                    ) : (
                      <>
                        <div className="space-y-3 mb-4">
                          {items.map((item) => (
                            <div key={item.name} className="flex justify-between items-center">
                              <div>
                                <p className="text-white">{item.name}</p>
                                <p className="text-sm text-gray-400">
                                  ${item.price.toFixed(2)} x {item.quantity}
                                </p>
                              </div>
                              <span className="font-semibold text-white">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-emerald-900/30 pt-3">
                          <div className="flex justify-between items-center font-semibold text-white">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                          </div>
                          <button 
                            onClick={handleCheckout}
                            className="w-full mt-4 bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-500 transition"
                          >
                            Checkout
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Navigation Controls */}
            <div className="flex items-center space-x-4 md:hidden">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-2 text-gray-300 hover:text-white transition"
              >
                <ShoppingCart className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-300 hover:text-white focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden fixed inset-x-0 top-14 h-[calc(100vh-3.5rem)] bg-black/90 backdrop-blur-md animate-fade-in overflow-y-auto border-t border-emerald-900/30">
              <div className="px-4 py-6 space-y-4">
                <Link
                  to="/benefits"
                  className="block text-lg text-center text-gray-300 hover:text-white transition py-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Benefits
                </Link>
                <Link
                  to="/products"
                  className="block text-lg text-center text-gray-300 hover:text-white transition py-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Products
                </Link>
                <Link
                  to="/process"
                  className="block text-lg text-center text-gray-300 hover:text-white transition py-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Our Process
                </Link>
                <Link
                  to="/portal"
                  className="block text-lg text-center text-gray-300 hover:text-white transition py-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Client Portal
                </Link>
              </div>
            </div>
          )}

          {/* Mobile Cart Popup */}
          {isCartOpen && (
            <div className="md:hidden fixed inset-x-0 top-14 h-[calc(100vh-3.5rem)] bg-black/90 backdrop-blur-md animate-fade-in overflow-y-auto border-t border-emerald-900/30">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Shopping Cart</h3>
                {items.length === 0 ? (
                  <p className="text-gray-400">Your cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-4">
                      {items.map((item) => (
                        <div key={item.name} className="flex justify-between items-center">
                          <div>
                            <p className="text-white font-medium">{item.name}</p>
                            <p className="text-sm text-gray-400">
                              ${item.price.toFixed(2)} x {item.quantity}
                            </p>
                          </div>
                          <span className="font-semibold text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-emerald-900/30 pt-4 sticky bottom-0">
                      <div className="flex justify-between items-center font-semibold text-white text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      <button 
                        onClick={handleCheckout}
                        className="w-full mt-4 bg-emerald-600 text-white px-4 py-3 rounded-full hover:bg-emerald-500 transition text-lg font-medium"
                      >
                        Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        total={total}
        onPaymentComplete={handlePaymentComplete}
      />
    </>
  );
}

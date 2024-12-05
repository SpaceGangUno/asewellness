import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, ShoppingCart, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CheckoutModal from './CheckoutModal';
import DetoxQuiz from './DetoxQuiz';
import LotusIcon from './LotusIcon';

export default function Navbar() {
  const { items, total, clearCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
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
      <nav className="fixed w-full bg-black/40 backdrop-blur-sm z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center space-x-2">
              <LotusIcon className="h-6 w-6 text-cyan-400" />
              <span className="text-lg font-bold text-white">Asé Juices</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/about" className="text-gray-300 hover:text-white transition">About</Link>
              <Link to="/products" className="text-gray-300 hover:text-white transition">Products</Link>
              <button
                onClick={() => setIsQuizOpen(true)}
                className="text-gray-300 hover:text-white transition flex items-center space-x-2"
              >
                <Sparkles className="h-4 w-4" />
                <span>Find Your Perfect Detox</span>
              </button>
              <Link to="/portal" className="bg-cyan-600 text-white px-6 py-2 rounded-full hover:bg-cyan-500 transition flex items-center space-x-2">
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
                    <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </button>

                {isCartOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-black/80 backdrop-blur-sm rounded-lg shadow-lg p-4 animate-fade-in border border-white/10">
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
                        <div className="border-t border-white/10 pt-3">
                          <div className="flex justify-between items-center font-semibold text-white">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                          </div>
                          <button 
                            onClick={handleCheckout}
                            className="w-full mt-4 bg-cyan-600 text-white px-4 py-2 rounded-full hover:bg-cyan-500 transition"
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
                onClick={() => setIsQuizOpen(true)}
                className="text-gray-300 hover:text-white transition"
              >
                <Sparkles className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-2 text-gray-300 hover:text-white transition"
              >
                <ShoppingCart className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
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
            <div className="md:hidden fixed inset-x-0 top-14 h-[calc(100vh-3.5rem)] bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto border-t border-white/10">
              <div className="px-4 py-6 space-y-4">
                <Link
                  to="/about"
                  className="block text-lg text-center text-gray-300 hover:text-white transition py-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/products"
                  className="block text-lg text-center text-gray-300 hover:text-white transition py-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Products
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
            <div className="md:hidden fixed inset-x-0 top-14 h-[calc(100vh-3.5rem)] bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto border-t border-white/10">
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
                    <div className="border-t border-white/10 pt-4 sticky bottom-0">
                      <div className="flex justify-between items-center font-semibold text-white text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      <button 
                        onClick={handleCheckout}
                        className="w-full mt-4 bg-cyan-600 text-white px-4 py-3 rounded-full hover:bg-cyan-500 transition text-lg font-medium"
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

      <DetoxQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        total={total}
        onPaymentComplete={handlePaymentComplete}
      />
    </>
  );
}

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Process from './pages/Process';
import Benefits from './pages/Benefits';
import ClientPortal from './pages/ClientPortal';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { useScrollToTop } from './hooks/useScrollToTop';

// Ensure the key is properly loaded from environment variables
const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
if (!stripeKey) {
  console.error('Stripe public key is missing. Please check your environment variables.');
}
const stripePromise = loadStripe(stripeKey);

function ScrollToTop() {
  useScrollToTop();
  return null;
}

function App() {
  if (!stripeKey) {
    console.error('Stripe public key is missing');
  }

  return (
    <AuthProvider>
      <CartProvider>
        <Elements stripe={stripePromise}>
          <BrowserRouter>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/process" element={<Process />} />
                  <Route path="/benefits" element={<Benefits />} />
                  <Route path="/portal/*" element={<ClientPortal />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </BrowserRouter>
        </Elements>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

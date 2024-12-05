import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import ClientPortal from './pages/ClientPortal';
import Detox from './pages/Detox';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { useScrollToTop } from './hooks/useScrollToTop';
import StripeProvider from './components/StripeProvider';

function ScrollToTop() {
  useScrollToTop();
  return null;
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <StripeProvider>
          <BrowserRouter>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/portal/*" element={<ClientPortal />} />
                  <Route path="/detox" element={<Detox />} />
                  {/* Redirect old routes to new About page */}
                  <Route path="/benefits" element={<Navigate to="/about" replace />} />
                  <Route path="/process" element={<Navigate to="/about" replace />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </BrowserRouter>
        </StripeProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

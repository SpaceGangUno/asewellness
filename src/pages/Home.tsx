import React from 'react';
import Hero from '../components/Hero';
import Products from '../components/Products';
import DetoxSection from '../components/sections/DetoxSection';
import JuiceSection from '../components/sections/JuiceSection';

export default function Home() {
  return (
    <main className="flex-1 overflow-x-hidden">
      <Hero />
      
      <div className="relative">
        {/* Curved divider */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-br from-emerald-900 via-cyan-900 to-blue-900">
          <svg className="absolute bottom-0 w-full h-16 text-emerald-50" preserveAspectRatio="none" viewBox="0 0 1440 54">
            <path fill="currentColor" d="M0 54h1440V0c-192 35.2-384 53.2-576 53.2S480 35.2 288 0H0v54z" />
          </svg>
        </div>
        
        <DetoxSection />
      </div>
      
      <JuiceSection />
      
      <div className="bg-gradient-to-br from-gray-50 to-emerald-50 py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Our Products
            </h2>
            <p className="text-xl text-gray-600">
              Discover our complete line of premium wellness products
            </p>
          </div>
          <Products />
        </div>
      </div>
    </main>
  );
}

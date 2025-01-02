import React from 'react';
import Hero from '../components/Hero';
import Products from '../components/Products';
import DetoxSection from '../components/sections/DetoxSection';
import JuiceSection from '../components/sections/JuiceSection';

export default function Home() {
  return (
    <main className="flex-1 snap-y snap-mandatory overflow-y-auto">
      <div className="snap-start">
        <Hero />
      </div>
      
      <div className="snap-start">
        <DetoxSection />
      </div>
      
      <div className="snap-start">
        <JuiceSection />
      </div>
      
      <div className="snap-start">
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50">
          <Products />
        </div>
      </div>
    </main>
  );
}

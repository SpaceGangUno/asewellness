import React from 'react';
import Hero from '../components/Hero';
import Products from '../components/Products';

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Products />
    </main>
  );
}

import React from 'react';
import Hero from '../components/Hero';
import Products from '../components/Products';
import Process from '../components/Process';

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Products />
      <Process />
    </main>
  );
}

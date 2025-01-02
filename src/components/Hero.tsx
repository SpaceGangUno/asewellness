import React, { useEffect, useState } from 'react';
import { Heart, Brain, Sparkles } from 'lucide-react';

const benefits = [
  { 
    icon: Heart,
    text: "Rich in Minerals & Vitamins",
    color: "from-emerald-400/20 to-emerald-400/10"
  },
  { 
    icon: Brain,
    text: "Supports Brain Health",
    color: "from-cyan-400/20 to-cyan-400/10"
  },
  { 
    icon: Sparkles,
    text: "Boosts Immunity",
    color: "from-blue-400/20 to-blue-400/10"
  }
];

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-emerald-900 via-cyan-900 to-blue-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />

      {/* Content */}
      <div className="relative container mx-auto px-4 pt-32 pb-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div 
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-6xl font-bold tracking-tight leading-[1.1] text-white">
              Discover
              <span className="block bg-gradient-to-r from-emerald-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                Premium Seamoss
              </span>
              Supplements
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl">
              Harness the power of the ocean with our new premium-grade seamoss, packed with essential nutrients for optimal health.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-white px-8 py-4 rounded-lg font-medium hover:from-emerald-500 hover:to-cyan-500 transition-all shadow-lg hover:shadow-xl">
                Shop Seamoss Products
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-medium hover:bg-white/20 transition-all">
                Learn More
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div 
                    key={index}
                    className="relative group"
                  >
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${benefit.color} blur-xl group-hover:blur-2xl transition-all`} />
                    <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:border-white/30 transition-colors flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-lg font-medium text-white">
                        {benefit.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div 
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 blur-2xl" />
            <div className="relative grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80" 
                alt="Seamoss product"
                className="rounded-2xl shadow-2xl w-full h-64 object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <img 
                src="https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&q=80" 
                alt="Natural ingredients"
                className="rounded-2xl shadow-2xl w-full h-64 object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <img 
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80" 
                alt="Wellness lifestyle"
                className="rounded-2xl shadow-2xl w-full h-64 object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <img 
                src="https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&q=80" 
                alt="Product benefits"
                className="rounded-2xl shadow-2xl w-full h-64 object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2">
        <span className="text-sm font-medium text-white/60">Scroll to explore</span>
        <div className="w-1 h-12 rounded-full bg-white/20">
          <div className="w-full h-1/2 bg-gradient-to-b from-white to-transparent rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

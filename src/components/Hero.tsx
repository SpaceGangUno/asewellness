import React, { useEffect, useState } from 'react';
import DetoxQuiz from './DetoxQuiz';
import { Sparkles, Leaf, Battery, ChevronDown } from 'lucide-react';

const benefits = [
  { icon: Sparkles, text: "Total Body Reset" },
  { icon: Leaf, text: "Natural Ingredients" },
  { icon: Battery, text: "Boost Energy" },
];

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-[85vh] overflow-hidden">
      <div 
        className="absolute inset-0 transition-transform duration-[2s] ease-out"
        style={{ transform: isVisible ? 'scale(1)' : 'scale(1.1)' }}
      >
        <img
          src="https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&q=80"
          alt="Fresh juices background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 to-emerald-800/60 backdrop-blur-[2px]" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[85vh] flex items-center py-16 sm:py-20">
        <div className="w-full max-w-2xl space-y-10">
          <div 
            className={`space-y-6 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]">
              <span className="block">Elevate Your</span>
              <span className="block bg-gradient-to-r from-emerald-200 to-emerald-400 text-transparent bg-clip-text">
                Wellness Journey
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-emerald-50/90 leading-relaxed max-w-xl font-light">
              Experience the power of nature through our premium cold-pressed juices.
            </p>
          </div>
          
          <div 
            className={`grid grid-cols-1 sm:grid-cols-3 gap-3 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={benefit.text} 
                  className="group relative flex items-center space-x-3 bg-white/10 backdrop-blur-md rounded-xl p-3 transition-all duration-300 hover:bg-white/15 overflow-hidden"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300 group-hover:scale-110 transition-transform duration-300 relative">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-lg text-white/90 font-medium relative">{benefit.text}</span>
                </div>
              );
            })}
          </div>

          <div 
            className={`transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <DetoxQuiz />
          </div>
        </div>
      </div>
      
      <div 
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 animate-bounce transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ChevronDown className="w-6 h-6" />
      </div>
    </div>
  );
}

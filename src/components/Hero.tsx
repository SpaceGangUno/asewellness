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
    <div className="relative min-h-[85vh] bg-emerald-900">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[85vh] flex items-center py-12 sm:py-16">
        <div className="w-full max-w-2xl space-y-8">
          <div 
            className={`space-y-4 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1]">
              <span className="text-emerald-200">
                Natural Wellness Journey
              </span>
            </h1>
            <p className="text-xl text-emerald-100/90 leading-relaxed max-w-xl font-light">
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
                  className="group relative flex items-center space-x-3 bg-emerald-800/50 rounded-xl p-3 transition-all duration-300 hover:bg-emerald-800/70 overflow-hidden"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-700/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-700/30 text-emerald-300 group-hover:scale-110 transition-transform duration-300 relative">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-lg text-emerald-100 font-medium relative">{benefit.text}</span>
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
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 text-emerald-300 animate-bounce transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ChevronDown className="w-6 h-6" />
      </div>
    </div>
  );
}

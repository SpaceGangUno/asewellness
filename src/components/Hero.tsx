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
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-[100svh] overflow-hidden">
      <div 
        className="absolute inset-0 transition-transform duration-[2s] ease-out"
        style={{ 
          transform: `scale(${isVisible ? '1' : '1.1'}) translateY(${scrollY * 0.5}px)`,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&q=80"
          alt="Fresh juices background"
          className="w-full h-full object-cover object-center scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-emerald-950/80 to-black/90" />
      </div>
      
      <div className="relative w-full px-4 min-h-[100svh] flex flex-col justify-center pt-20 pb-16">
        <div className="w-full space-y-8">
          <div 
            className={`space-y-4 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-5xl font-bold tracking-tight leading-[1.1]">
              <span className="block text-white opacity-90">Natural</span>
              <span className="block bg-gradient-to-r from-emerald-200 via-emerald-100 to-emerald-200 text-transparent bg-clip-text">
                Wellness
              </span>
              <span className="block text-emerald-400">Journey</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed font-light max-w-md">
              Experience the power of nature through our premium cold-pressed juices.
            </p>
          </div>
          
          <div 
            className={`grid grid-cols-1 gap-3 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={benefit.text} 
                  className="group relative flex items-center space-x-3 bg-black/30 backdrop-blur-sm rounded-xl p-4 transition-all duration-300 hover:bg-emerald-950/50 border border-emerald-900/30 touch-manipulation"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-lg text-white font-medium">{benefit.text}</span>
                </div>
              );
            })}
          </div>

          <div 
            className={`pt-2 transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <DetoxQuiz />
          </div>
        </div>
      </div>
      
      <div 
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 animate-bounce transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ChevronDown className="w-6 h-6" />
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import DetoxQuiz from './DetoxQuiz';
import { Sparkles, Leaf, Battery, ChevronDown } from 'lucide-react';

const benefits = [
  { icon: Sparkles, text: "Total Body Reset" },
  { icon: Leaf, text: "Raw Ingredients" },
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
    <div className="relative min-h-[80vh] overflow-hidden">
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
      
      <div className="relative w-full px-4 min-h-[80vh] flex flex-col justify-center pt-16 pb-12">
        <div className="w-full space-y-6">
          <div 
            className={`space-y-3 transition-all duration-1000 delay-300 ${
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
            className={`grid grid-cols-1 gap-2 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={benefit.text} 
                  className="group relative flex items-center space-x-3 bg-black/30 backdrop-blur-sm rounded-xl p-3 transition-all duration-300 hover:bg-emerald-950/50 border border-emerald-900/30 touch-manipulation"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-base text-white font-medium">{benefit.text}</span>
                </div>
              );
            })}
          </div>

          <div 
            className={`relative transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <DetoxQuiz />
            <div 
              className={`absolute left-1/2 -translate-x-1/2 mt-4 transition-all duration-500 ${
                isVisible && scrollY < 100 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <div className="flex flex-col items-center space-y-0.5">
                <span className="text-xs font-medium text-emerald-300/80">Scroll to explore</span>
                <ChevronDown className="w-4 h-4 text-emerald-300/80 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

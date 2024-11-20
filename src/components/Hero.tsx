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
    <div className="relative min-h-[100svh] overflow-hidden">
      <div 
        className="absolute inset-0 transition-transform duration-[2s] ease-out"
        style={{ transform: isVisible ? 'scale(1)' : 'scale(1.1)' }}
      >
        <img
          src="https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&q=80"
          alt="Fresh juices background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-emerald-900/90" />
      </div>
      
      <div className="relative w-full px-4 min-h-[100svh] flex flex-col justify-center pt-20 pb-16">
        <div className="w-full space-y-6">
          <div 
            className={`space-y-3 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-5xl font-bold tracking-tight leading-[1.1] text-emerald-200">
              Natural
              <br />
              Wellness
              <br />
              Journey
            </h1>
            <p className="text-lg text-emerald-100/90 leading-relaxed font-light">
              Experience the power of nature through our premium cold-pressed juices.
            </p>
          </div>
          
          <div 
            className={`grid grid-cols-1 gap-2.5 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={benefit.text} 
                  className="group relative flex items-center space-x-3 bg-emerald-800/30 backdrop-blur-sm rounded-xl p-3.5 transition-all duration-300 hover:bg-emerald-800/50 active:bg-emerald-800/60 touch-manipulation"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-700/30 text-emerald-300 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-lg text-emerald-200 font-medium">{benefit.text}</span>
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
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 text-emerald-300 animate-bounce transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ChevronDown className="w-6 h-6" />
      </div>
    </div>
  );
}

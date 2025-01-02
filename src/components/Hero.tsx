import React, { useEffect, useState } from 'react';
import { Sparkles, Heart, Brain, ChevronDown } from 'lucide-react';
import DetoxQuiz from './DetoxQuiz';

const benefits = [
  { icon: Heart, text: "Rich in Minerals & Vitamins" },
  { icon: Brain, text: "Supports Brain Health" },
  { icon: Sparkles, text: "Boosts Immunity" },
];

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

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
          src="https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&q=80"
          alt="Natural supplements and herbs"
          className="w-full h-full object-cover object-center scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/90 via-emerald-800/80 to-blue-900/90" />
      </div>
      
      <div className="relative w-full px-4 min-h-[80vh] flex flex-col justify-center pt-16 pb-12">
        <div className="w-full space-y-6">
          <div 
            className={`space-y-3 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-5xl font-bold tracking-tight leading-[1.1]">
              <span className="block text-white opacity-90">Discover</span>
              <span className="block bg-gradient-to-r from-cyan-200 via-emerald-200 to-blue-200 text-transparent bg-clip-text">
                Premium Seamoss
              </span>
              <span className="block text-cyan-400">Supplements</span>
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed font-light max-w-md">
              Harness the power of the ocean with our new premium-grade seamoss, packed with essential nutrients for optimal health.
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
                  className="group relative flex items-center space-x-3 bg-black/30 backdrop-blur-sm rounded-xl p-3 transition-all duration-300 hover:bg-cyan-900/50 border border-cyan-800/30 touch-manipulation"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-300 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-base text-white font-medium">{benefit.text}</span>
                </div>
              );
            })}
          </div>

          <div 
            className={`flex flex-col items-center space-y-6 transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <button
              onClick={() => setIsQuizOpen(true)}
              className="bg-white text-cyan-600 px-8 py-3 rounded-full hover:bg-cyan-50 transition flex items-center space-x-2"
            >
              <Sparkles className="h-5 w-5" />
              <span>Shop Seamoss Products</span>
            </button>

            <div 
              className={`transition-all duration-500 ${
                isVisible && scrollY < 100 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <div className="flex flex-col items-center space-y-0.5">
                <span className="text-xs font-medium text-cyan-300/80">Scroll to explore</span>
                <ChevronDown className="w-4 h-4 text-cyan-300/80 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <DetoxQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  );
}

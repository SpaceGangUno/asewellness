import React from 'react';
import DetoxQuiz from './DetoxQuiz';
import { Sparkles, Leaf, Battery, ChevronDown } from 'lucide-react';

const benefits = [
  { icon: Sparkles, text: "Total Body Reset" },
  { icon: Leaf, text: "Natural Ingredients" },
  { icon: Battery, text: "Boost Energy" },
];

export default function Hero() {
  return (
    <div className="relative min-h-[85vh]">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&q=80"
          alt="Fresh juices background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 to-emerald-800/70 sm:from-emerald-900/90 sm:to-emerald-800/50" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[85vh] flex items-center py-16 sm:py-20">
        <div className="w-full max-w-2xl space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              Start Your Wellness Journey Today
            </h1>
            <p className="text-xl text-emerald-50/90 leading-relaxed max-w-xl">
              Transform your health with our premium cold-pressed juices and natural detox programs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={benefit.text} 
                  className="group flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-xl p-2.5 transition-all duration-300 hover:bg-white/10"
                >
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-base text-white/90 font-medium">{benefit.text}</span>
                </div>
              );
            })}
          </div>

          <div>
            <DetoxQuiz />
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 animate-bounce">
        <ChevronDown className="w-6 h-6" />
      </div>
    </div>
  );
}

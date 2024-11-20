import React from 'react';
import DetoxQuiz from './DetoxQuiz';
import { Sparkles, Leaf, Battery } from 'lucide-react';

const benefits = [
  { icon: Sparkles, text: "Total Body Reset" },
  { icon: Leaf, text: "Natural Ingredients" },
  { icon: Battery, text: "Boost Energy" },
];

export default function Hero() {
  return (
    <div className="relative min-h-[100svh]">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&q=80"
          alt="Fresh juices background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 to-emerald-800/70 sm:from-emerald-900/90 sm:to-emerald-800/50" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[100svh] flex items-center py-24 sm:py-32">
        <div className="w-full max-w-2xl space-y-12">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
              Start Your Wellness Journey Today
            </h1>
            <p className="text-xl sm:text-2xl text-emerald-50/90 leading-relaxed max-w-xl">
              Transform your health with our premium cold-pressed juices and natural detox programs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={benefit.text} 
                  className="group flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 transition-all duration-300 hover:bg-white/15"
                >
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-lg text-white font-medium">{benefit.text}</span>
                </div>
              );
            })}
          </div>

          <div className="pt-4">
            <DetoxQuiz />
          </div>
        </div>
      </div>
    </div>
  );
}

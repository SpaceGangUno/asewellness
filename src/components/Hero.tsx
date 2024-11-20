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
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[100svh] flex items-center py-20 sm:py-0">
        <div className="w-full max-w-2xl">
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-500/20 text-emerald-100 mb-4 sm:mb-6 text-sm sm:text-base">
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
            <span className="line-clamp-1">Transform Your Life with Our Detox Programs</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight">
            Start Your Wellness Journey Today
          </h1>
          <p className="text-lg sm:text-xl text-emerald-50 mb-6 sm:mb-8 leading-relaxed">
            Experience the power of natural detoxification. Our carefully crafted programs 
            help cleanse your body, boost energy levels, and restore your natural balance.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={benefit.text} 
                  className="flex items-center justify-center sm:justify-start space-x-2 text-emerald-100 bg-emerald-500/10 sm:bg-transparent rounded-lg sm:rounded-none p-3 sm:p-0"
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base">{benefit.text}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <DetoxQuiz />
          </div>
        </div>
      </div>
    </div>
  );
}

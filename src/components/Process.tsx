import React from 'react';
import { Leaf, Droplets, ThermometerSun, Timer } from 'lucide-react';

const steps = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description: "We source only the finest organic produce from local farmers"
  },
  {
    icon: Droplets,
    title: "Cold Pressed",
    description: "Our hydraulic press extracts every drop of goodness"
  },
  {
    icon: ThermometerSun,
    title: "Never Heated",
    description: "Raw nutrients preserved through cold processing"
  },
  {
    icon: Timer,
    title: "Same Day Delivery",
    description: "From press to your door within hours"
  }
];

export default function Process() {
  return (
    <section id="process" className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-emerald-900 mb-8 sm:mb-12">
          Our Cold Press Process
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.title} 
                className="flex flex-col items-center text-center p-6 rounded-xl bg-emerald-50/50 hover:bg-emerald-50 transition-colors duration-300"
              >
                <div className="relative">
                  <div className="inline-flex p-3 sm:p-4 bg-emerald-100 rounded-full mb-4 sm:mb-5">
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 left-[calc(100%+1rem)] w-[calc(100%-2rem)] h-0.5 bg-emerald-100">
                      <div className="absolute right-0 -top-1 w-2 h-2 bg-emerald-200 rounded-full" />
                    </div>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-emerald-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

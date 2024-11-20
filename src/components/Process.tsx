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
    <section id="process" className="bg-emerald-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Our Cold Press Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.title} 
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-emerald-800 rounded-full flex items-center justify-center">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 left-[calc(100%+1rem)] w-[calc(100%-2rem)] h-0.5 bg-emerald-800">
                      <div className="absolute right-0 -top-1 w-2 h-2 bg-emerald-700 rounded-full" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-emerald-100 text-lg">
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

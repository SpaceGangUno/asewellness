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
    <section id="process" className="bg-emerald-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-2xl font-bold whitespace-nowrap">
            Our Cold Press Process
          </h2>
          <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-4 md:gap-8 w-full">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={step.title} 
                  className="flex items-center gap-3 group"
                >
                  <div className="relative flex-shrink-0">
                    <div className="p-2 bg-emerald-800 rounded-full group-hover:bg-emerald-700 transition-colors duration-300">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 left-[calc(100%+0.5rem)] w-4 h-0.5 bg-emerald-800">
                        <div className="absolute right-0 -top-1 w-1.5 h-1.5 bg-emerald-700 rounded-full" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-sm font-semibold">
                      {step.title}
                    </h3>
                    <p className="text-xs text-emerald-100 max-w-[150px]">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

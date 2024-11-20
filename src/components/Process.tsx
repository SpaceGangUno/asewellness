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
    <section id="process" className="bg-gradient-to-br from-black/90 via-emerald-950/80 to-black/90 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Our Cold Press Process
        </h2>
        <div className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.title} 
                className="flex-shrink-0 w-[280px] snap-center flex items-center space-x-3 bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-emerald-900/30"
              >
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-emerald-500/20">
                  <Icon className="h-6 w-6 text-emerald-300" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-white truncate">
                    {step.title}
                  </h3>
                  <p className="text-sm text-emerald-100 line-clamp-2">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

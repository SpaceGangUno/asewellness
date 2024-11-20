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

const ProcessCard = ({ step }: { step: typeof steps[0] }) => {
  const Icon = step.icon;
  return (
    <div className="flex-shrink-0 w-[280px] flex items-center space-x-3 bg-emerald-950/30 backdrop-blur-sm rounded-xl p-4 border border-emerald-400/20 hover:border-emerald-400/30 transition-colors">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-emerald-400/10">
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
};

export default function Process() {
  return (
    <section id="process" className="relative py-12 bg-gradient-to-b from-emerald-950/10 via-emerald-900/20 to-emerald-950/10">
      <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />
      <div className="max-w-7xl mx-auto px-4 relative">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Our Cold Press Process
        </h2>
        <div className="relative overflow-hidden">
          <div className="pause-on-hover">
            <div className="flex gap-4 animate-scroll">
              {/* First set of cards */}
              {steps.map((step, index) => (
                <ProcessCard key={`${step.title}-1`} step={step} />
              ))}
              {/* Duplicate set for seamless loop */}
              {steps.map((step, index) => (
                <ProcessCard key={`${step.title}-2`} step={step} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

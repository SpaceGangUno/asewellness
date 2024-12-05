import React from 'react';
import { Leaf, Droplets, ThermometerSun, Timer } from 'lucide-react';
import styles from './Process.module.css';

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
    <div className="flex-shrink-0 w-[280px] flex items-center space-x-3 bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-colors">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-cyan-500/20">
        <Icon className="h-6 w-6 text-cyan-300" />
      </div>
      <div className="min-w-0">
        <h3 className="text-lg font-semibold text-white truncate">
          {step.title}
        </h3>
        <p className="text-sm text-gray-200 line-clamp-2">
          {step.description}
        </p>
      </div>
    </div>
  );
};

export default function Process() {
  return (
    <section id="process" className="relative py-12 bg-gradient-to-br from-cyan-900/90 via-emerald-800/80 to-blue-900/90">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <div className="max-w-7xl mx-auto px-4 relative">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Our Cold Press Process
        </h2>
        <div className={styles.wrapper}>
          <div className={styles.scrollContainer}>
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
    </section>
  );
}

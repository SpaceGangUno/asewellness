import React from 'react';
import { Leaf, Battery, Heart } from 'lucide-react';

const benefits = [
  {
    icon: Leaf,
    title: "Natural Cleanse",
    description: "Reset your body with our carefully crafted detox program"
  },
  {
    icon: Battery,
    title: "Boost Energy",
    description: "Feel revitalized and energized after just one day"
  },
  {
    icon: Heart,
    title: "Improve Wellness",
    description: "Support your body's natural detoxification process"
  }
];

export default function DetoxSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-emerald-50 to-cyan-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            1-Day Detox Program
          </h2>
          <p className="text-lg text-gray-600">
            Transform your health in just 24 hours with our specialized detox program
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-emerald-600 text-white px-8 py-3 rounded-full hover:bg-emerald-700 transition-colors">
            Start Your Detox Journey
          </button>
        </div>
      </div>
    </section>
  );
}

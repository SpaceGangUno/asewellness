import React from 'react';
import { Apple, Carrot, Banana } from 'lucide-react';

const juices = [
  {
    icon: Apple,
    name: "Green Vitality",
    ingredients: "Kale, Spinach, Apple, Cucumber",
    benefits: "Rich in vitamins and minerals"
  },
  {
    icon: Carrot,
    name: "Immunity Boost",
    ingredients: "Carrot, Orange, Ginger, Turmeric",
    benefits: "Supports immune system"
  },
  {
    icon: Banana,
    name: "Energy Blend",
    ingredients: "Beet, Apple, Lemon, Ginger",
    benefits: "Natural energy boost"
  }
];

export default function JuiceSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Cold Press Juices
          </h2>
          <p className="text-lg text-gray-600">
            Handcrafted with fresh, organic ingredients for maximum nutrition
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {juices.map((juice, index) => {
            const Icon = juice.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {juice.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {juice.ingredients}
                </p>
                <p className="text-gray-600">
                  {juice.benefits}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-orange-600 text-white px-8 py-3 rounded-full hover:bg-orange-700 transition-colors">
            View All Juices
          </button>
        </div>
      </div>
    </section>
  );
}

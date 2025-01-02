import React from 'react';
import { Leaf, Battery, Heart } from 'lucide-react';

const benefits = [
  {
    icon: Leaf,
    title: "Natural Cleanse",
    description: "Reset your body with our carefully crafted detox program",
    color: "from-emerald-400/20 to-emerald-400/10"
  },
  {
    icon: Battery,
    title: "Boost Energy",
    description: "Feel revitalized and energized after just one day",
    color: "from-cyan-400/20 to-cyan-400/10"
  },
  {
    icon: Heart,
    title: "Improve Wellness",
    description: "Support your body's natural detoxification process",
    color: "from-blue-400/20 to-blue-400/10"
  }
];

export default function DetoxSection() {
  return (
    <section className="relative py-32 bg-gradient-to-br from-emerald-50 to-cyan-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50" />

      <div className="relative container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              1-Day Detox Program
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Transform your health in just 24 hours with our specialized detox program,
              designed to revitalize your body and mind.
            </p>
            <button className="bg-gradient-to-r from-emerald-600 to-cyan-600 text-white px-8 py-4 rounded-lg font-medium hover:from-emerald-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl">
              Start Your Detox Journey
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 blur-2xl" />
            <img 
              src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80" 
              alt="Detox juice ingredients" 
              className="relative rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index}
                className="relative group"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${benefit.color} blur-xl group-hover:blur-2xl transition-all`} />
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-6">
          <img 
            src="https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80" 
            alt="Fresh ingredients" 
            className="rounded-2xl shadow-lg hover:shadow-xl transition-all"
          />
          <img 
            src="https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&q=80" 
            alt="Juice preparation" 
            className="rounded-2xl shadow-lg hover:shadow-xl transition-all"
          />
          <img 
            src="https://images.unsplash.com/photo-1600718374662-0483d2b9da44?auto=format&fit=crop&q=80" 
            alt="Healthy lifestyle" 
            className="rounded-2xl shadow-lg hover:shadow-xl transition-all"
          />
        </div>
      </div>
    </section>
  );
}

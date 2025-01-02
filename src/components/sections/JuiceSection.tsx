import React from 'react';
import { Apple, Carrot, Banana } from 'lucide-react';

const juices = [
  {
    icon: Apple,
    name: "Green Vitality",
    ingredients: "Kale, Spinach, Apple, Cucumber",
    benefits: "Rich in vitamins and minerals for daily wellness",
    color: "from-emerald-400/20 to-emerald-400/10",
    gradient: "from-emerald-500 to-emerald-600",
    image: "https://images.unsplash.com/photo-1619847516690-8015fdd0f34e?auto=format&fit=crop&q=80"
  },
  {
    icon: Carrot,
    name: "Immunity Boost",
    ingredients: "Carrot, Orange, Ginger, Turmeric",
    benefits: "Supports immune system and reduces inflammation",
    color: "from-orange-400/20 to-orange-400/10",
    gradient: "from-orange-500 to-orange-600",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&q=80"
  },
  {
    icon: Banana,
    name: "Energy Blend",
    ingredients: "Beet, Apple, Lemon, Ginger",
    benefits: "Natural energy boost for peak performance",
    color: "from-red-400/20 to-red-400/10",
    gradient: "from-red-500 to-red-600",
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80"
  }
];

export default function JuiceSection() {
  return (
    <section className="relative py-32 bg-gradient-to-br from-gray-900 to-emerald-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />

      <div className="relative container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-5xl font-bold text-white mb-6">
              Cold Press Juices
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Handcrafted with fresh, organic ingredients for maximum nutrition
              and unparalleled taste. Each bottle is packed with nature's finest ingredients.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-emerald-900 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all">
                Shop All Juices
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-medium hover:bg-white/20 transition-all border border-white/20 hover:border-white/30">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 blur-2xl" />
            <img 
              src="https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&q=80" 
              alt="Fresh cold-pressed juices" 
              className="relative rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {juices.map((juice, index) => {
            const Icon = juice.icon;
            return (
              <div 
                key={index}
                className="relative group"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${juice.color} blur-xl group-hover:blur-2xl transition-all`} />
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:border-white/30 transition-all">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={juice.image} 
                      alt={juice.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <div className={`w-12 h-12 bg-gradient-to-br ${juice.gradient} rounded-xl flex items-center justify-center mb-6`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {juice.name}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">
                      {juice.ingredients}
                    </p>
                    <p className="text-gray-400">
                      {juice.benefits}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-24 grid md:grid-cols-4 gap-6">
          <img 
            src="https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&q=80" 
            alt="Juice preparation" 
            className="rounded-2xl shadow-lg hover:shadow-xl transition-all"
          />
          <img 
            src="https://images.unsplash.com/photo-1600718374662-0483d2b9da44?auto=format&fit=crop&q=80" 
            alt="Fresh ingredients" 
            className="rounded-2xl shadow-lg hover:shadow-xl transition-all"
          />
          <img 
            src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80" 
            alt="Juice bottles" 
            className="rounded-2xl shadow-lg hover:shadow-xl transition-all"
          />
          <img 
            src="https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&q=80" 
            alt="Healthy lifestyle" 
            className="rounded-2xl shadow-lg hover:shadow-xl transition-all"
          />
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShoppingCart, Sparkles, Leaf, Battery, Brain } from 'lucide-react';
import { useCart } from '../context/CartContext';

const detoxPrograms = {
  "boost-energy": {
    id: "boost-energy",
    name: "Energy Enhancement Program",
    description: "Elevate your energy levels naturally with our carefully crafted selection.",
    icon: Battery,
    image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&q=80",
    highlight: "Boost your vitality with natural ingredients",
    keyPoints: [
      "Natural energy enhancement",
      "Improved blood flow",
      "Sustained performance",
      "No crashes"
    ],
    products: [
      { 
        name: "Energy Booster Juice",
        price: 12.99,
        description: "Packed with beets, ginger, and citrus for a natural energy lift",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80"
      },
      { 
        name: "Green Wellness Tea",
        price: 9.99,
        description: "Infused with matcha and ginseng to maintain energy throughout the day",
        image: "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&q=80"
      },
      { 
        name: "Replenishing Recovery Juice",
        price: 10.99,
        description: "For post-work energy restoration",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80"
      }
    ]
  },
  "mental-clarity": {
    id: "mental-clarity",
    name: "Mental Focus Program",
    description: "Enhance cognitive function and mental clarity with our specialized blends.",
    icon: Brain,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80",
    highlight: "Sharpen your mind naturally",
    keyPoints: [
      "Enhanced cognitive function",
      "Reduced mental fatigue",
      "Improved concentration",
      "Stress reduction"
    ],
    products: [
      { 
        name: "Focus & Clarity Blend",
        price: 13.99,
        description: "A juice with turmeric, lemon, and blueberries to boost brain function",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80"
      },
      { 
        name: "Herbal Calming Tea",
        price: 8.99,
        description: "Ingredients like chamomile and ashwagandha for stress reduction",
        image: "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&q=80"
      },
      { 
        name: "Brain Boost Shot",
        price: 5.99,
        description: "A small concentrated shot with ginkgo biloba and green tea extract",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80"
      }
    ]
  },
  "digestive-health": {
    id: "digestive-health",
    name: "Digestive Wellness Program",
    description: "Support your gut health with our specially formulated products.",
    icon: Leaf,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80",
    highlight: "Optimize your digestive health",
    keyPoints: [
      "Improved gut health",
      "Reduced bloating",
      "Better nutrient absorption",
      "Regular digestion"
    ],
    products: [
      { 
        name: "Gut Cleanse Juice",
        price: 11.99,
        description: "A blend of green apple, celery, and aloe vera for gut health",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80"
      },
      { 
        name: "Probiotic Wellness Tea",
        price: 8.99,
        description: "Supports digestion with probiotics and peppermint",
        image: "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&q=80"
      },
      { 
        name: "Fiber Boost Shot",
        price: 4.99,
        description: "With chia seeds and ginger to regulate digestion",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80"
      }
    ]
  },
  "overall-detox": {
    id: "overall-detox",
    name: "Complete Detox Program",
    description: "A comprehensive approach to full-body cleansing and renewal.",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80",
    highlight: "Reset and renew your body",
    keyPoints: [
      "Full-body cleanse",
      "Natural detoxification",
      "Optimal hydration",
      "Renewed energy"
    ],
    products: [
      { 
        name: "Detoxifying Green Blend",
        price: 12.99,
        description: "With spinach, kale, and parsley for a full-body cleanse",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80"
      },
      { 
        name: "Liver Cleanse Tea",
        price: 8.99,
        description: "With milk thistle and dandelion to support liver function",
        image: "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&q=80"
      },
      { 
        name: "Hydration Recovery Juice",
        price: 9.99,
        description: "Coconut water, cucumber, and mint for hydration",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80"
      }
    ]
  }
};

export default function Detox() {
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  const programRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  useEffect(() => {
    const program = searchParams.get('program');
    if (program && programRefs.current[program]) {
      setTimeout(() => {
        programRefs.current[program]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [searchParams]);

  const handleAddToCart = (products: typeof detoxPrograms[keyof typeof detoxPrograms]['products']) => {
    products.forEach((product) => {
      addToCart({ name: product.name, price: product.price, quantity: 1 });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 to-black">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-white mb-4 text-center">
          Our Detox Programs
        </h1>
        <p className="text-emerald-400 text-xl mb-12 text-center max-w-2xl mx-auto">
          Discover the perfect detox program tailored to your wellness journey
        </p>
        <div className="space-y-24">
          {Object.values(detoxPrograms).map((program) => (
            <div
              key={program.id}
              ref={el => programRefs.current[program.id] = el}
              className="relative bg-gradient-to-br from-emerald-950/50 to-black/50 rounded-2xl overflow-hidden transition-all duration-300 group"
            >
              <div className="absolute inset-0 overflow-hidden">
                <img 
                  src={program.image} 
                  alt={program.name}
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-25 transition-opacity duration-300"
                />
              </div>
              
              <div className="relative p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <program.icon className="h-10 w-10 text-emerald-400" />
                  <div>
                    <h2 className="text-3xl font-bold text-white">
                      {program.name}
                    </h2>
                    <p className="text-emerald-400 text-lg">
                      {program.description}
                    </p>
                  </div>
                </div>

                <div className="bg-emerald-950/30 backdrop-blur-sm rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-semibold text-emerald-400 mb-4">{program.highlight}</h3>
                  <ul className="grid grid-cols-2 gap-4">
                    {program.keyPoints.map((point) => (
                      <li key={point} className="flex items-center space-x-2 text-emerald-300">
                        <Sparkles className="h-4 w-4 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {program.products.map((product) => (
                    <div key={product.name} className="bg-emerald-950/30 backdrop-blur-sm rounded-xl overflow-hidden group">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex justify-between items-end">
                            <span className="font-semibold text-white text-lg">{product.name}</span>
                            <span className="font-bold text-emerald-400 text-lg">${product.price.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-emerald-300 text-sm">{product.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => handleAddToCart(program.products)}
                    className="bg-emerald-600 text-white px-8 py-3 rounded-full hover:bg-emerald-500 transition flex items-center space-x-3"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add Program to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

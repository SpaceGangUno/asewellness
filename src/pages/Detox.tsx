import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShoppingCart, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

const detoxPrograms = {
  "boost-energy": {
    id: "boost-energy",
    name: "Energy Enhancement Program",
    description: "Elevate your energy levels naturally with our carefully crafted selection.",
    details: "Our Energy Enhancement Program is designed to naturally boost your vitality throughout the day. Each product is carefully formulated with ingredients known for their energy-boosting properties. The program includes a powerful juice blend with beets for improved blood flow, ginger for metabolism boost, and citrus for natural energy. Combined with our specialized tea and recovery juice, this program provides sustained energy without crashes.",
    products: [
      { name: "Energy Booster Juice", price: 12.99, description: "Packed with beets, ginger, and citrus for a natural energy lift" },
      { name: "Green Wellness Tea", price: 9.99, description: "Infused with matcha and ginseng to maintain energy throughout the day" },
      { name: "Replenishing Recovery Juice", price: 10.99, description: "For post-work energy restoration" }
    ]
  },
  "mental-clarity": {
    id: "mental-clarity",
    name: "Mental Focus Program",
    description: "Enhance cognitive function and mental clarity with our specialized blends.",
    details: "The Mental Focus Program is crafted to support optimal brain function and mental clarity. Our unique combination of ingredients includes powerful antioxidants from blueberries, anti-inflammatory properties from turmeric, and natural focus enhancers. The program features a strategic blend of adaptogens and nootropics to help reduce mental fatigue while promoting sustained concentration and cognitive performance.",
    products: [
      { name: "Focus & Clarity Blend", price: 13.99, description: "A juice with turmeric, lemon, and blueberries to boost brain function" },
      { name: "Herbal Calming Tea", price: 8.99, description: "Ingredients like chamomile and ashwagandha for stress reduction" },
      { name: "Brain Boost Shot", price: 5.99, description: "A small concentrated shot with ginkgo biloba and green tea extract" }
    ]
  },
  "digestive-health": {
    id: "digestive-health",
    name: "Digestive Wellness Program",
    description: "Support your gut health with our specially formulated products.",
    details: "Our Digestive Wellness Program focuses on optimizing your gut health through carefully selected ingredients known for their digestive benefits. The program combines the cleansing properties of green apple and celery with the soothing effects of aloe vera. Our probiotic tea and fiber boost shot work together to support healthy digestion, reduce bloating, and promote regular gut function.",
    products: [
      { name: "Gut Cleanse Juice", price: 11.99, description: "A blend of green apple, celery, and aloe vera for gut health" },
      { name: "Probiotic Wellness Tea", price: 8.99, description: "Supports digestion with probiotics and peppermint" },
      { name: "Fiber Boost Shot", price: 4.99, description: "With chia seeds and ginger to regulate digestion" }
    ]
  },
  "overall-detox": {
    id: "overall-detox",
    name: "Complete Detox Program",
    description: "A comprehensive approach to full-body cleansing and renewal.",
    details: "The Complete Detox Program offers a holistic approach to body cleansing and renewal. Our carefully curated selection of products works synergistically to support your body's natural detoxification processes. The program includes a powerful green blend rich in chlorophyll and antioxidants, a specialized tea targeting liver health, and a hydrating juice blend to help flush toxins while maintaining optimal hydration levels.",
    products: [
      { name: "Detoxifying Green Blend", price: 12.99, description: "With spinach, kale, and parsley for a full-body cleanse" },
      { name: "Liver Cleanse Tea", price: 8.99, description: "With milk thistle and dandelion to support liver function" },
      { name: "Hydration Recovery Juice", price: 9.99, description: "Coconut water, cucumber, and mint for hydration" }
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
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-white mb-4 text-center">
          Our Detox Programs
        </h1>
        <p className="text-emerald-400 text-xl mb-12 text-center max-w-2xl mx-auto">
          Discover the perfect detox program tailored to your wellness journey
        </p>
        <div className="space-y-12">
          {Object.values(detoxPrograms).map((program) => (
            <div
              key={program.id}
              ref={el => programRefs.current[program.id] = el}
              className="bg-black/50 backdrop-blur-lg rounded-xl overflow-hidden transition-all duration-300 hover:bg-black/70 border border-emerald-900/30"
            >
              <div className="p-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  {program.name}
                </h2>
                <p className="text-emerald-400 text-lg mb-6">
                  {program.description}
                </p>
                <div className="bg-emerald-950/50 rounded-xl p-6 mb-8 border border-emerald-900/30">
                  <p className="text-emerald-300 leading-relaxed">
                    {program.details}
                  </p>
                </div>
                <div className="space-y-4">
                  {program.products.map((product) => (
                    <div key={product.name} className="bg-emerald-950/30 p-5 rounded-xl border border-emerald-900/30">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-white text-lg">{product.name}</span>
                        <span className="font-bold text-emerald-400 text-lg">${product.price.toFixed(2)}</span>
                      </div>
                      <p className="text-emerald-300">{product.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => handleAddToCart(program.products)}
                    className="bg-emerald-600 text-white px-8 py-3 rounded-full hover:bg-emerald-700 transition flex items-center space-x-3"
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

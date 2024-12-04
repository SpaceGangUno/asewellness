import React, { useState } from 'react';
import { Sparkles, Battery, Brain, Heart, ShoppingCart, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';

const questions = [
  {
    id: 1,
    question: "What's your main wellness goal?",
    options: [
      { text: "Boost Energy", icon: Battery, info: "Natural energy enhancement through carefully selected ingredients" },
      { text: "Mental Clarity", icon: Brain, info: "Support cognitive function and reduce mental fatigue" },
      { text: "Digestive Health", icon: Heart, info: "Improve gut health and digestive wellness" },
      { text: "Overall Detox", icon: Sparkles, info: "Comprehensive cleansing and body reset" }
    ]
  },
  {
    id: 2,
    question: "How would you describe your current lifestyle?",
    options: [
      { text: "Always on the go", icon: Battery, info: "Solutions for busy, active lifestyles" },
      { text: "Mostly sedentary", icon: Brain, info: "Products to boost vitality and movement" },
      { text: "Balanced but need boost", icon: Heart, info: "Enhancement for your wellness routine" },
      { text: "Stressed and tired", icon: Sparkles, info: "Relief and rejuvenation focused products" }
    ]
  },
  {
    id: 3,
    question: "What's your experience with detox programs?",
    options: [
      { text: "First timer", icon: Battery, info: "Gentle introduction to detox programs" },
      { text: "Occasional", icon: Brain, info: "Moderate intensity cleansing" },
      { text: "Regular", icon: Heart, info: "Advanced detox solutions" },
      { text: "Expert", icon: Sparkles, info: "Professional-grade wellness programs" }
    ]
  }
];

type Product = {
  name: string;
  price: number;
  description: string;
};

type Program = {
  name: string;
  description: string;
  products: Product[];
};

type ProgramKey = "Boost Energy" | "Mental Clarity" | "Digestive Health" | "Overall Detox";

const recommendations: Record<ProgramKey, Program> = {
  "Boost Energy": {
    name: "Energy Enhancement Program",
    description: "Elevate your energy levels naturally with our carefully crafted selection.",
    products: [
      { name: "Energy Booster Juice", price: 12.99, description: "Packed with beets, ginger, and citrus for a natural energy lift" },
      { name: "Green Wellness Tea", price: 9.99, description: "Infused with matcha and ginseng to maintain energy throughout the day" },
      { name: "Replenishing Recovery Juice", price: 10.99, description: "For post-work energy restoration" }
    ]
  },
  "Mental Clarity": {
    name: "Mental Focus Program",
    description: "Enhance cognitive function and mental clarity with our specialized blends.",
    products: [
      { name: "Focus & Clarity Blend", price: 13.99, description: "A juice with turmeric, lemon, and blueberries to boost brain function" },
      { name: "Herbal Calming Tea", price: 8.99, description: "Ingredients like chamomile and ashwagandha for stress reduction" },
      { name: "Brain Boost Shot", price: 5.99, description: "A small concentrated shot with ginkgo biloba and green tea extract" }
    ]
  },
  "Digestive Health": {
    name: "Digestive Wellness Program",
    description: "Support your gut health with our specially formulated products.",
    products: [
      { name: "Gut Cleanse Juice", price: 11.99, description: "A blend of green apple, celery, and aloe vera for gut health" },
      { name: "Probiotic Wellness Tea", price: 8.99, description: "Supports digestion with probiotics and peppermint" },
      { name: "Fiber Boost Shot", price: 4.99, description: "With chia seeds and ginger to regulate digestion" }
    ]
  },
  "Overall Detox": {
    name: "Complete Detox Program",
    description: "A comprehensive approach to full-body cleansing and renewal.",
    products: [
      { name: "Detoxifying Green Blend", price: 12.99, description: "With spinach, kale, and parsley for a full-body cleanse" },
      { name: "Liver Cleanse Tea", price: 8.99, description: "With milk thistle and dandelion to support liver function" },
      { name: "Hydration Recovery Juice", price: 9.99, description: "Coconut water, cucumber, and mint for hydration" }
    ]
  }
};

export default function DetoxQuiz() {
  const { addToCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [recommendation, setRecommendation] = useState<Program | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showInfo, setShowInfo] = useState<string | null>(null);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Use the primary wellness goal (first answer) to determine the program
      const programKey = newAnswers[0] as ProgramKey;
      setRecommendation(recommendations[programKey] || recommendations["Overall Detox"]);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setRecommendation(null);
    setAddedToCart(false);
    setShowInfo(null);
  };

  const handleAddToCart = () => {
    if (recommendation) {
      recommendation.products.forEach((product) => {
        addToCart({ name: product.name, price: product.price, quantity: 1 });
      });
      setAddedToCart(true);
    }
  };

  return (
    <div className="mt-8 flex justify-center">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white text-emerald-600 px-8 py-3 rounded-full hover:bg-emerald-50 transition flex items-center space-x-2"
        >
          <Sparkles className="h-5 w-5" />
          <span>Find Your Perfect Detox</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 max-w-xl animate-fade-in">
          {!recommendation ? (
            <div>
              <h3 className="text-xl font-semibold text-emerald-900 mb-4">
                {questions[currentQuestion].question}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions[currentQuestion].options.map((option) => {
                  const Icon = option.icon;
                  return (
                    <div key={option.text} className="relative">
                      <button
                        onClick={() => handleAnswer(option.text)}
                        className="w-full flex flex-col items-center p-4 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition"
                      >
                        <Icon className="h-8 w-8 text-emerald-600 mb-2" />
                        <span className="text-emerald-900">{option.text}</span>
                      </button>
                      <button
                        onClick={() => setShowInfo(showInfo === option.text ? null : option.text)}
                        className="absolute top-2 right-2 p-1 rounded-full bg-emerald-100 hover:bg-emerald-200 transition"
                      >
                        <Info className="h-4 w-4 text-emerald-600" />
                      </button>
                      {showInfo === option.text && (
                        <div className="absolute z-10 top-full left-0 right-0 mt-2 p-3 bg-white rounded-lg shadow-lg text-sm text-emerald-800">
                          {option.info}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">
                {recommendation.name}
              </h3>
              <p className="text-emerald-700 mb-6">{recommendation.description}</p>
              <div className="space-y-4 mb-6">
                {recommendation.products.map((product) => (
                  <div key={product.name} className="bg-emerald-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-emerald-900">{product.name}</span>
                      <span className="font-bold text-emerald-600">${product.price.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-emerald-700 text-left">{product.description}</p>
                  </div>
                ))}
              </div>
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={resetQuiz}
                  className="bg-emerald-100 text-emerald-700 px-6 py-2 rounded-full hover:bg-emerald-200 transition"
                >
                  Start Over
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  className={`flex items-center space-x-2 px-6 py-2 rounded-full transition ${
                    addedToCart
                      ? 'bg-emerald-200 text-emerald-800 cursor-not-allowed'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>{addedToCart ? 'Added to Cart' : 'Add All to Cart'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

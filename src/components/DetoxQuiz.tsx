import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Battery, Brain, Heart, ShoppingCart, Info, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

type QuestionOption = {
  text: string;
  icon: React.FC<{ className?: string }>;
  info: string;
};

type Question = {
  id: number;
  question: string;
  options: QuestionOption[];
};

const questions: Question[] = [
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

const programIds: Record<string, string> = {
  "Boost Energy": "boost-energy",
  "Mental Clarity": "mental-clarity",
  "Digestive Health": "digestive-health",
  "Overall Detox": "overall-detox"
};

export default function DetoxQuiz() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showInfo, setShowInfo] = useState<string | null>(null);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Navigate to detox page with the selected program
      navigate(`/detox?program=${programIds[newAnswers[0]]}`);
      resetQuiz();
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowInfo(null);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-white text-emerald-600 px-8 py-3 rounded-full hover:bg-emerald-50 transition flex items-center space-x-2"
      >
        <Sparkles className="h-5 w-5" />
        <span>Find Your Perfect Detox</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={resetQuiz} />
          <div className="relative bg-black/90 backdrop-blur-lg rounded-xl p-8 max-w-xl w-full animate-fade-in border border-emerald-900/30">
            <button
              onClick={resetQuiz}
              className="absolute top-4 right-4 text-emerald-400 hover:text-emerald-300 transition"
            >
              <X className="h-6 w-6" />
            </button>
            
            <h3 className="text-2xl font-semibold text-white mb-6">
              {questions[currentQuestion].question}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions[currentQuestion].options.map((option) => {
                const Icon = option.icon;
                return (
                  <div key={option.text} className="relative group">
                    <button
                      onClick={() => handleAnswer(option.text)}
                      className="w-full flex flex-col items-center p-6 rounded-xl bg-emerald-950/50 hover:bg-emerald-900/50 border border-emerald-800/30 transition group-hover:border-emerald-600/50"
                    >
                      <Icon className="h-8 w-8 text-emerald-400 mb-3 group-hover:scale-110 transition duration-300" />
                      <span className="text-white text-lg">{option.text}</span>
                    </button>
                    <button
                      onClick={() => setShowInfo(showInfo === option.text ? null : option.text)}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-emerald-900/50 hover:bg-emerald-800/50 transition"
                    >
                      <Info className="h-4 w-4 text-emerald-400" />
                    </button>
                    {showInfo === option.text && (
                      <div className="absolute z-10 top-full left-0 right-0 mt-2 p-4 bg-emerald-950/90 backdrop-blur-sm rounded-lg border border-emerald-800/30 shadow-xl">
                        <p className="text-sm text-emerald-300">
                          {option.info}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

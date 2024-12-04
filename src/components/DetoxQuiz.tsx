import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Battery, Brain, Heart, Sparkles, X } from 'lucide-react';
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

interface DetoxQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DetoxQuiz({ isOpen, onClose }: DetoxQuizProps) {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

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
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black" />
      <button
        onClick={resetQuiz}
        className="absolute top-4 right-4 text-emerald-400/60 hover:text-emerald-400/80 transition z-10"
      >
        <X className="h-6 w-6" />
      </button>
      
      <div className="relative h-full flex flex-col justify-center px-6">
        <h3 className="text-[28px] text-white mb-8 leading-tight">
          {questions[currentQuestion].question}
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {questions[currentQuestion].options.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.text}
                onClick={() => handleAnswer(option.text)}
                className="relative aspect-[4/3] flex flex-col items-center justify-center bg-[#001A12] hover:bg-[#002A1E] rounded-lg transition group"
              >
                <Icon className="h-12 w-12 text-emerald-400 mb-4" />
                <span className="text-white text-lg">{option.text}</span>
                <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-emerald-400/60 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

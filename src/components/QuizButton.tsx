import React from 'react';
import DetoxQuiz from './DetoxQuiz';

export default function QuizButton() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-float">
      <div className="bg-emerald-600/90 hover:bg-emerald-600 backdrop-blur-sm rounded-full p-2 shadow-lg shadow-emerald-900/20 transition-all duration-300 hover:scale-105">
        <div className="relative">
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full" />
          <DetoxQuiz />
        </div>
      </div>
    </div>
  );
}

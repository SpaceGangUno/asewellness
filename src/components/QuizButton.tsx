import React from 'react';
import DetoxQuiz from './DetoxQuiz';

export default function QuizButton() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-black/20 backdrop-blur-sm rounded-full p-1.5">
        <DetoxQuiz />
      </div>
    </div>
  );
}

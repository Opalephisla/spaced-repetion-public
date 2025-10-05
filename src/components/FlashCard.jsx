import React from 'react';

export const FlashCard = ({ card, showAnswer, selectedAnswer, onSelectAnswer }) => {
  return (
    <div className="w-full max-w-2xl">
      <div className="w-full rounded-lg shadow-lg bg-slate-800 p-6">
        <div className="text-xs text-blue-400 font-semibold mb-4 uppercase">
          {showAnswer ? 'Answer' : 'Question'}
        </div>
        
        <p className="text-white text-base leading-relaxed mb-6 overflow-y-auto max-h-48">
          {card.question}
        </p>

        {card.type === 'multiple_choice' && (
          <div className="space-y-2 w-full">
            {card.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === card.correctAnswer;
              
              let bgColor = 'bg-slate-700 border-slate-600';
              
              if (showAnswer) {
                if (isCorrect) {
                  bgColor = 'bg-green-900 border-green-500';
                } else if (isSelected && !isCorrect) {
                  bgColor = 'bg-red-900 border-red-500';
                } else {
                  bgColor = 'bg-slate-700 border-slate-600 opacity-50';
                }
              } else if (isSelected) {
                bgColor = 'bg-blue-900 border-blue-500';
              }

              return (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!showAnswer) onSelectAnswer(index);
                  }}
                  disabled={showAnswer}
                  className={`w-full text-left p-3 rounded-lg border-2 ${bgColor} transition-all ${
                    !showAnswer ? 'hover:border-blue-400 cursor-pointer' : 'cursor-default'
                  }`}
                >
                  <span className="font-bold mr-2">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span>{option}</span>
                  {showAnswer && isCorrect && (
                    <span className="ml-2 text-green-400 font-bold">✓ Correct</span>
                  )}
                  {showAnswer && isSelected && !isCorrect && (
                    <span className="ml-2 text-red-400 font-bold">✗ Your answer</span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {showAnswer && card.explanation && (
          <div className="mt-4 p-4 bg-slate-700 rounded-lg">
            <p className="text-sm text-gray-300 italic">{card.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};
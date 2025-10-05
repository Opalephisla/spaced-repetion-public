import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { FlashCard } from '../components/FlashCard';
import { calculateNextReview } from '../utils/spacedRepetition';
import { QUALITY_RATINGS } from '../constants';

export const StudyView = ({ session, onExit }) => {
  const {
    progress,
    setProgress,
    notifiedIds,
    setNotifiedIds,
    setLastSession,
    addNotification
  } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [stats, setStats] = useState({
    new: 0,
    learning: 0,
    review: 0,
    correct: 0,
    reviewed: 0
  });

  const reviewResultsRef = useRef([]);
  
  useEffect(() => {
    const newCount = session.cards.filter(
      c => !progress[c.id] || progress[c.id]?.repetitions === 0
    ).length;
    
    const learningCount = session.cards.filter(
      c => progress[c.id] && 
           progress[c.id].repetitions > 0 && 
           progress[c.id].interval < 1440
    ).length;
  
    setStats({
      new: newCount,
      learning: learningCount,
      review: session.cards.length - newCount - learningCount,
      correct: 0,
      reviewed: 0
    });
    
    reviewResultsRef.current = [];
  }, [session]); // REMOVED progress from dependencies!

  const handleReview = (quality) => {
    const card = session.cards[currentIndex];
    const cardProgress = progress[card.id] || { repetitions: 0, interval: 0 };
    const { repetitions, interval, nextReview } = calculateNextReview(
      quality,
      cardProgress.repetitions
    );
    const isCorrect = selectedAnswer === card.correctAnswer;
  
    // Debug BEFORE push
    const lengthBefore = reviewResultsRef.current.length;
    console.log('Before push:', lengthBefore);
    
    // Add review
    reviewResultsRef.current.push({ isCorrect });
    
    // Debug AFTER push
    const lengthAfter = reviewResultsRef.current.length;
    console.log('After push:', lengthAfter);
    
    const totalReviewed = reviewResultsRef.current.length;
    const totalCorrect = reviewResultsRef.current.filter(r => r.isCorrect).length;
  
    alert(`Card index: ${currentIndex}, Before: ${lengthBefore}, After: ${lengthAfter}, Total cards: ${session.cards.length}, Is last? ${totalReviewed >= session.cards.length}`);
  
    setProgress(prev => ({
      ...prev,
      [card.id]: {
        repetitions,
        interval,
        nextReview,
        lastReviewed: new Date().toISOString()
      }
    }));
  
    setNotifiedIds(prev => prev.filter(id => id !== card.id));
    
    setStats(prev => ({
      ...prev,
      reviewed: totalReviewed,
      correct: totalCorrect
    }));
  
    if (totalReviewed >= session.cards.length) {
      const finalStats = {
        correct: totalCorrect,
        incorrect: totalReviewed - totalCorrect,
        total: totalReviewed,
        deckName: session.deckName
      };
      
      setLastSession(finalStats);
      onExit(finalStats);
    } else {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setShowAnswer(false);
        setSelectedAnswer(null);
      }, 300);
    }
  };

  if (!session.cards[currentIndex]) {
    return null;
  }

  const currentCard = session.cards[currentIndex];
  const progressPercent = (stats.reviewed / session.cards.length) * 100;

  return (
    <div className="min-h-screen text-white px-4 py-4">
      <div className="max-w-3xl mx-auto flex flex-col min-h-screen">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className="text-gray-400">
              Card {stats.reviewed + 1} of {session.cards.length}
            </span>
            <span className="text-gray-400">
              Deck: <span className="text-white">{session.deckName}</span>
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="flex-grow flex flex-col justify-center items-center relative my-8">
          <FlashCard
            card={currentCard}
            showAnswer={showAnswer}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={setSelectedAnswer}
          />
        </div>

        <div className="mt-auto">
          {!showAnswer ? (
            <button
              onClick={() => setShowAnswer(true)}
              disabled={selectedAnswer === null}
              className={`w-full font-semibold py-4 rounded-lg transition-colors ${
                selectedAnswer === null
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {selectedAnswer === null ? 'Select an answer first' : 'Check Answer'}
            </button>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => handleReview(QUALITY_RATINGS.AGAIN)}
                className="bg-red-600 hover:bg-red-700 text-white py-4 px-2 rounded-lg transition-colors flex flex-col items-center"
              >
                <span className="text-xs mb-1">1 min</span>
                <span className="font-semibold text-sm">Again</span>
              </button>
              <button
                onClick={() => handleReview(QUALITY_RATINGS.HARD)}
                className="bg-orange-600 hover:bg-orange-700 text-white py-4 px-2 rounded-lg transition-colors flex flex-col items-center"
              >
                <span className="text-xs mb-1">1 hour</span>
                <span className="font-semibold text-sm">Hard</span>
              </button>
              <button
                onClick={() => handleReview(QUALITY_RATINGS.GOOD)}
                className="bg-green-600 hover:bg-green-700 text-white py-4 px-2 rounded-lg transition-colors flex flex-col items-center"
              >
                <span className="text-xs mb-1">1 day</span>
                <span className="font-semibold text-sm">Good</span>
              </button>
              <button
                onClick={() => handleReview(QUALITY_RATINGS.EASY)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-2 rounded-lg transition-colors flex flex-col items-center"
              >
                <span className="text-xs mb-1">4 days</span>
                <span className="font-semibold text-sm">Easy</span>
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-4 border-t border-slate-700 pt-4">
          <button
onClick={() => {
  console.log('Exiting without results');
  onExit(null);
}}
            className="text-gray-400 hover:text-white text-sm"
          >
            Exit
          </button>
          <div className="flex items-center space-x-4 font-mono text-sm">
            <span className="text-blue-400">{stats.new}</span>
            <span className="text-orange-400">{stats.learning}</span>
            <span className="text-green-400">{stats.review}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
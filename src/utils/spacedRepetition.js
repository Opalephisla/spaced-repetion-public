import { QUALITY_RATINGS } from '../constants';

export const calculateNextReview = (quality, currentRepetitions) => {
  let interval; // in minutes
  let repetitions = currentRepetitions;

  if (quality < QUALITY_RATINGS.HARD) {
    // Again
    interval = 1;
    repetitions = 0;
  } else if (quality === QUALITY_RATINGS.HARD) {
    // Hard
    interval = 60; // 1 hour
    repetitions++;
  } else if (quality === QUALITY_RATINGS.GOOD) {
    // Good
    interval = 1440; // 1 day
    repetitions++;
  } else {
    // Easy
    interval = 5760; // 4 days
    repetitions++;
  }

  const nextReview = new Date();
  nextReview.setMinutes(nextReview.getMinutes() + interval);

  return {
    repetitions,
    interval,
    nextReview: nextReview.toISOString()
  };
};

export const getDueCards = (cards, progress) => {
  const now = new Date();
  return cards.filter(card => 
    !progress[card.id] || new Date(progress[card.id].nextReview) <= now
  );
};

export const getCardsByStatus = (cards, progress) => {
  const newCards = [];
  const learningCards = [];
  const reviewCards = [];

  cards.forEach(card => {
    const cardProgress = progress[card.id];
    
    if (!cardProgress || cardProgress.repetitions === 0) {
      newCards.push(card);
    } else if (cardProgress.interval < 1440) {
      learningCards.push(card);
    } else {
      reviewCards.push(card);
    }
  });

  return { newCards, learningCards, reviewCards };
};
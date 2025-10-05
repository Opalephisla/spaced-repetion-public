import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const useNotifications = () => {
  const {
    notificationsEnabled,
    decks,
    cards,
    progress,
    notifiedIds,
    setNotifiedIds,
    addNotification
  } = useApp();

  useEffect(() => {
    if (!notificationsEnabled) return;

    const checkDueCards = () => {
      const now = new Date();
      const dueCards = cards.filter(card =>
        progress[card.id] &&
        new Date(progress[card.id].nextReview) <= now
      );

      const newDueCards = dueCards.filter(card =>
        !notifiedIds.includes(card.id)
      );

      if (newDueCards.length > 0) {
        newDueCards.forEach((card, index) => {
          setTimeout(() => {
            const deck = decks.find(d => d.id === card.deckId);
            const deckName = deck ? deck.name : 'your deck';
            const message = `You have cards due in the "${deckName}" deck.`;
            addNotification('Time to Study!', message, 'study');
          }, index * 400);
        });

        setNotifiedIds(prev => [
          ...new Set([...prev, ...newDueCards.map(c => c.id)])
        ]);
      }
    };

    const interval = setInterval(checkDueCards, 60000); // Check every minute
    checkDueCards(); // Initial check

    return () => clearInterval(interval);
  }, [notificationsEnabled, decks, cards, progress, notifiedIds, setNotifiedIds, addNotification]);
};
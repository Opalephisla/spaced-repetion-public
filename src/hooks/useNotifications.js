import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const useNotifications = () => {
  const {
    notificationsEnabled,
    cards,
    decks,
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
        // Group cards by deck
        const cardsByDeck = newDueCards.reduce((acc, card) => {
          if (!acc[card.deckId]) {
            acc[card.deckId] = [];
          }
          acc[card.deckId].push(card);
          return acc;
        }, {});

        // Send notification for each deck
        Object.entries(cardsByDeck).forEach(([deckId, deckCards], index) => {
          setTimeout(() => {
            const deck = decks.find(d => d.id === deckId);
            const deckName = deck?.name || 'Unknown Deck';
            const cardCount = deckCards.length;
            const message = `${cardCount} card${cardCount > 1 ? 's' : ''} ready to review in ${deckName}`;
            addNotification('Time to Study!', message, 'study');
          }, index * 400);
        });

        setNotifiedIds(prev => [
          ...new Set([...prev, ...newDueCards.map(c => c.id)])
        ]);
      }
    };

    const interval = setInterval(checkDueCards, 60000);
    checkDueCards();

    return () => clearInterval(interval);
  }, [notificationsEnabled, cards, decks, progress, notifiedIds, setNotifiedIds, addNotification]);
};
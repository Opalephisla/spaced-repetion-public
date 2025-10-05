import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const useNotifications = () => {
  const {
    notificationsEnabled,
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
            const message = `Card ready: "${card.question.substring(0, 40)}..."`;
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
  }, [notificationsEnabled, cards, progress, notifiedIds, setNotifiedIds, addNotification]);
};
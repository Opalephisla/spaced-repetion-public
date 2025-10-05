import React, { useEffect } from 'react';

export const NotificationToast = ({ notification, onDismiss }) => {
  const bgClass = 
    notification.type === 'study' ? 'bg-gradient-to-r from-blue-600 to-purple-600' :
    notification.type === 'success' ? 'bg-gradient-to-r from-green-600 to-emerald-600' :
    'bg-gradient-to-r from-gray-700 to-gray-800';

  const emoji = 
    notification.type === 'study' ? '📚' :
    notification.type === 'success' ? '✅' : '🔔';

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(notification.id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification.id, onDismiss]);

  return (
    <div className={`rounded-lg shadow-2xl p-4 animate-slide-in ${bgClass} border-2 border-white/20`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <span className="text-2xl mr-2">{emoji}</span>
            <h4 className="font-bold text-white">{notification.title}</h4>
          </div>
          <p className="text-sm text-white/90">{notification.message}</p>
        </div>
        <button
          onClick={() => onDismiss(notification.id)}
          className="ml-3 text-white/60 hover:text-white text-xl leading-none"
        >
          &times;
        </button>
      </div>
    </div>
  );
};
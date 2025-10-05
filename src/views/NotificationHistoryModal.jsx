import React from 'react';

export const NotificationHistoryModal = ({ history, onClose, onClear }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 rounded-lg shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col p-6 border border-slate-700"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Notification History</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="overflow-y-auto space-y-3 pr-2">
          {history.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No notifications yet.</p>
          ) : (
            history.map(notif => (
              <div key={notif.id} className="bg-slate-700 p-3 rounded-lg">
                <div className="flex items-start">
                  <span className="text-xl mr-3 mt-1">
                    {notif.type === 'study' ? '📚' : notif.type === 'success' ? '✅' : '🔔'}
                  </span>
                  <div className="flex-1">
                    <p className="font-bold text-white">{notif.title}</p>
                    <p className="text-sm text-gray-300">{notif.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notif.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end gap-4 mt-6 border-t border-slate-700 pt-4">
          <button
            onClick={onClear}
            className="bg-red-800 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
          >
            Clear History
          </button>
          <button
            onClick={onClose}
            className="bg-slate-600 hover:bg-slate-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
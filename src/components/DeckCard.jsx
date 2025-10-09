import React from 'react';
import { Icon } from './Icon';

export const DeckCard = ({ deck, dueCount, totalCount, onStart }) => {
  return (
<div className="bg-slate-800 rounded-xl p-6 sm:p-8 transition-all hover:ring-2 ring-blue-500 flex flex-col">
  <div className="flex items-center mb-4">
    <Icon type="brain" className="w-8 h-8 text-slate-400" />
    <h2 className="text-xl sm:text-2xl font-bold text-white ml-4">{deck.name}</h2>
  </div>
  
  <p className="text-gray-400 mb-6 flex-grow">
    A collection of your custom cards.
  </p>
  
  <div className="mb-4 text-sm text-gray-500">
    <div className="flex justify-between mb-2">
      <span>Total cards:</span>
      <span className="text-white font-semibold">{totalCount}</span>
    </div>
    <div className="flex justify-between">
      <span>Due now:</span>
      <span className="text-yellow-500 font-semibold">{dueCount}</span>
    </div>
  </div>
  
  <button
    onClick={() => onStart(deck.id)}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
  >
    Start studying
  </button>
</div>
  );
};
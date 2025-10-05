import React from 'react';
import { Icon } from './Icon';

export const Navbar = ({ onHistoryClick, onHomeClick }) => {
  return (
    <nav className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Icon type="heart" className="w-8 h-8 text-blue-500" />
        <span className="text-xl font-bold">LearnFlow</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={onHistoryClick}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <Icon type="bell" />
          <span>History</span>
        </button>
        
        <button
          onClick={onHomeClick}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <Icon type="home" />
          <span>Home</span>
        </button>
      </div>
    </nav>
  );
};
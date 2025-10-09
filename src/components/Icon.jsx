import React from 'react';

const iconPaths = {
  home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  bell: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
  plus: 'M12 4v16m8-8H4',
  brain: 'M9 8H6v2h3v10h2V10h3V8h-3V6.5A2.5 2.5 0 0 1 13.5 4H15V2h-1.5C10.36 2 9 3.36 9 5.5V8zM12 22a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-5a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-5a2 2 0 1 1 0-4 2 2 0 0 1 0 4z',
  heart: 'M12 6.25278C12 6.25278 10.8333 4 8.5 4C5.5 4 3 6.5 3 9.5C3 12.5 6 15.5 12 21.5C18 15.5 21 12.5 21 9.5C21 6.5 18.5 4 15.5 4C13.1667 4 12 6.25278 12 6.25278Z',
  cloud: 'M17 21H7a4 4 0 01-4-4 5 5 0 019.5-1.7A6.4 6.4 0 0117 21z',
  download: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3',
  user: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z'
};

const strokeIcons = ['bell', 'plus', 'heart', 'cloud', 'download', 'user'];

export const Icon = ({ type, className = "w-5 h-5" }) => {
  const isStroke = strokeIcons.includes(type);
  
  return (
    <svg
      className={className}
      fill={isStroke ? 'none' : 'currentColor'}
      stroke={isStroke ? 'currentColor' : 'none'}
      strokeWidth={isStroke ? 2 : 0}
      strokeLinecap={isStroke ? 'round' : undefined}
      strokeLinejoin={isStroke ? 'round' : undefined}
      viewBox="0 0 24 24"
    >
      <path d={iconPaths[type]} />
    </svg>
  );
};
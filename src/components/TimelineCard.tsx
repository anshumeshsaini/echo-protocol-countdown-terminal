import React from 'react';
import { Event } from '../data/events';
import { ClockIcon, CheckIcon, ArrowRightIcon } from './icons/Icons';

interface TimelineCardProps {
  event: Event;
  isActive: boolean;
  isUpcoming: boolean;
  isPast: boolean;
  isLast: boolean;
  isFirst: boolean;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ 
  event, 
  isActive, 
  isUpcoming, 
  isPast,
  isLast,
  isFirst
}) => {
  // Format the time for display
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true
    }).format(date);
  };
  
  // Format the date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <div 
      className={`timeline-card-transition group relative h-[180px] sm:h-[200px] w-full overflow-hidden rounded-lg 
        ${isActive 
          ? 'border-2 border-cyan-500 bg-black/60 shadow-glow' 
          : isPast 
            ? 'border border-cyan-800/30 bg-black/40' 
            : isFirst && !isPast
              ? 'border border-green-800/30 bg-black/40'
              : isLast && !isPast
                ? 'border border-yellow-800/30 bg-black/40'
                : 'border border-gray-800 bg-black/30'
        }`}
    >
      {/* Card content - larger text size with no scrollbars */}
      <div className="relative z-10 flex h-full flex-col p-3 sm:p-4">
        {/* Status indicator with larger text */}
        <div className="mb-2 sm:mb-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isPast ? (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-900/30">
                <CheckIcon className="h-4 w-4 text-cyan-400" />
              </div>
            ) : (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black/40">
                <ClockIcon className="h-4 w-4 text-cyan-400/70" />
              </div>
            )}
            <span className="font-mono text-base sm:text-lg text-cyan-300 font-bold">{formatTime(event.time)}</span>
          </div>
          
          <div 
            className={`rounded-full px-3 py-1 text-sm font-bold uppercase
              ${isActive 
                ? 'bg-cyan-600 text-white' 
                : isUpcoming 
                  ? 'bg-cyan-900/50 text-cyan-300' 
                  : isPast 
                    ? 'bg-gray-800 text-gray-400'
                    : isFirst && !isPast
                      ? 'bg-green-900/50 text-green-300'
                      : isLast && !isPast
                        ? 'bg-yellow-900/50 text-yellow-300'
                        : 'bg-gray-800/50 text-gray-500'
              }`}
          >
            {isActive ? 'CURRENT' : isUpcoming ? 'NEXT' : isPast ? 'COMPLETE' : isFirst ? 'START' : isLast ? 'FINISH' : 'UPCOMING'}
          </div>
        </div>
        
        {/* Title - larger font and improved contrast */}
        <h3 
          className={`mb-2 text-lg sm:text-xl md:text-2xl font-bold leading-tight transition-colors text-shadow-lg
            ${isActive 
              ? 'text-cyan-300' 
              : isPast 
                ? 'text-gray-300' 
                : isFirst && !isPast
                  ? 'text-green-300'
                  : isLast && !isPast
                    ? 'text-yellow-300'
                    : 'text-white'
            }`}
        >
          {event.title}
        </h3>
        
        {/* Description - no scrollbars, larger text */}
        <p className="flex-1 text-base sm:text-lg text-gray-100 line-clamp-3 sm:line-clamp-4 text-shadow-sm">
          {event.description}
        </p>
      </div>
      
      {/* Visual effects based on card state */}
      {isActive && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-10 -top-10 h-20 w-20 rotate-45 bg-cyan-500/30"></div>
          <div className="absolute bottom-0 left-0 h-[2px] w-1/3 bg-gradient-to-r from-cyan-500 to-transparent"></div>
          <div className="absolute -bottom-14 -right-14 h-28 w-28 rounded-full bg-cyan-500/20 blur-lg"></div>
        </div>
      )}
      
      <div 
        className={`absolute right-3 top-3 h-2.5 w-2.5 rounded-full 
          ${isActive 
            ? 'bg-cyan-400 animate-pulse shadow-glow' 
            : isPast 
              ? 'bg-cyan-700'
              : isFirst && !isPast
                ? 'bg-green-600'
                : isLast && !isPast
                  ? 'bg-yellow-600'
                  : 'bg-gray-700'
          }`}
      ></div>
    </div>
  );
};

export default TimelineCard;

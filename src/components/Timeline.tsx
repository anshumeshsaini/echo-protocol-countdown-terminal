import React, { useMemo, useRef, useEffect, useState } from 'react';
import TimelineCard from './TimelineCard';
import { Event } from '../data/events';
import { ClockIcon, ChevronLeftIcon, ChevronRightIcon } from './icons/Icons';

interface TimelineProps {
  currentTime: Date;
  events: Event[];
  useCustomTime?: boolean;
}

const Timeline: React.FC<TimelineProps> = ({ 
  currentTime, 
  events,
  useCustomTime = false
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const activeCardRef = useRef<HTMLDivElement>(null);
  const [hoveredEventIndex, setHoveredEventIndex] = useState<number | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  
  // Calculate timeline state with proper error handling
  const timelineState = useMemo(() => {
    if (!events || events.length === 0) {
      return {
        progress: 0,
        currentEventIndex: -1,
        upcomingEventIndex: -1,
        completedEvents: 0,
        totalEvents: 0,
        isComplete: false
      };
    }

    const startTime = events[0].time.getTime();
    const endTime = events[events.length - 1].time.getTime();
    const totalDuration = endTime - startTime;
    const elapsedDuration = currentTime.getTime() - startTime;
    const progress = Math.min(Math.max((elapsedDuration / totalDuration) * 100, 0), 100);
    
    let currentEventIndex = -1;
    let upcomingEventIndex = -1;
    let completedEvents = 0;

    // Find current and upcoming events
    for (let i = 0; i < events.length; i++) {
      if (currentTime >= events[i].time) {
        currentEventIndex = i;
        completedEvents = i + 1;
      } else {
        upcomingEventIndex = i;
        break;
      }
    }

    // Safety check - ensure upcomingEventIndex is valid
    if (upcomingEventIndex === -1 && currentEventIndex < events.length - 1) {
      upcomingEventIndex = currentEventIndex + 1;
    } else if (upcomingEventIndex === -1) {
      // All events are in the past
      upcomingEventIndex = events.length - 1;
    }

    const isComplete = currentTime >= events[events.length - 1].time;

    return {
      progress,
      currentEventIndex,
      upcomingEventIndex,
      completedEvents,
      totalEvents: events.length,
      isComplete
    };
  }, [currentTime, events]);

  // Update scroll indicators
  const updateScrollState = () => {
    if (timelineRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = timelineRef.current;
      setScrollPosition(scrollLeft);
      setMaxScroll(scrollWidth - clientWidth);
    }
  };

  // Initialize scroll state
  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, []);

  // Auto-scroll to active event when currentEventIndex changes
  useEffect(() => {
    if (activeCardRef.current && timelineRef.current) {
      const scrollPos = activeCardRef.current.offsetLeft - timelineRef.current.clientWidth / 2 + activeCardRef.current.clientWidth / 2;
      timelineRef.current.scrollTo({ left: scrollPos, behavior: 'smooth' });
    }
  }, [timelineState.currentEventIndex]);

  // Listen for scroll events
  useEffect(() => {
    const ref = timelineRef.current;
    ref?.addEventListener('scroll', updateScrollState);
    return () => ref?.removeEventListener('scroll', updateScrollState);
  }, []);

  // Scroll timeline in the specified direction
  const scrollTimeline = (direction: 'left' | 'right') => {
    if (timelineRef.current) {
      const scrollAmount = timelineRef.current.clientWidth * 0.8;
      const targetScroll = direction === 'left' 
        ? timelineRef.current.scrollLeft - scrollAmount
        : timelineRef.current.scrollLeft + scrollAmount;
      
      timelineRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  // Format time display
  const formatTimeDisplay = (time: Date) => {
    // Check if time is valid before formatting
    if (!(time instanceof Date) || isNaN(time.getTime())) {
      return "Invalid time";
    }
    
    return time.toLocaleTimeString([], { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true
    });
  };

  // Format countdown display with error handling
  const formatCountdown = () => {
    if (!events || events.length === 0 || 
        timelineState.currentEventIndex === -1 || 
        timelineState.upcomingEventIndex === -1 || 
        timelineState.upcomingEventIndex >= events.length) {
      return "00:00:00";
    }

    if (timelineState.isComplete) {
      return "00:00:00";
    }

    // Get the target date for countdown
    let targetDate;
    if (timelineState.currentEventIndex < events.length - 1) {
      targetDate = events[timelineState.upcomingEventIndex].time;
    } else {
      // We're at the last event
      return "00:00:00";
    }

    const diffMs = targetDate.getTime() - currentTime.getTime();
    if (diffMs <= 0) return "00:00:00";

    const diffSec = Math.floor(diffMs / 1000);
    const hours = Math.floor(diffSec / 3600);
    const minutes = Math.floor((diffSec % 3600) / 60);
    const seconds = diffSec % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Safety check in case there are no events
  if (!events || events.length === 0) {
    return (
      <div className="w-full py-10 text-center">
        <div className="glassmorphism-deep inline-block px-4 py-3 rounded-lg">
          <span className="text-cyan-400">No events scheduled</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full timeline-container">
      {/* Enhanced countdown display with even larger text */}
      <div className="mb-3 md:mb-4">
        <div className="glassmorphism-deep flex flex-col mx-auto max-w-full md:max-w-2xl overflow-hidden rounded-lg shadow-lg">
          <div className="border-b border-cyan-800/20 bg-black/30 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <ClockIcon className="h-7 w-7 text-cyan-400 mr-2 animate-pulse-slow" />
              <h2 className="font-orbitron text-lg md:text-xl tracking-[0.15em] text-cyan-300 font-bold text-shadow-sm">
                {timelineState.isComplete ? "HACKATHON COMPLETE" : "TIME REMAINING"}
              </h2>
            </div>
            
            <div className="text-lg text-cyan-400/80 font-mono flex items-center font-medium">
              <span className="font-bold">{timelineState.completedEvents}</span>
              <span className="mx-1 opacity-60">/</span>
              <span>{timelineState.totalEvents}</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-black/30 via-cyan-900/10 to-black/30 py-6 px-6">
            <div className="flex items-center justify-center flex-col">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-orbitron text-cyan-300 tracking-widest text-shadow-lg">
                {formatCountdown()}
              </div>
              
              {/* Show current time when custom time is enabled */}
              {useCustomTime && (
                <div className="mt-3 text-lg sm:text-xl font-mono text-cyan-300/80 flex items-center">
                  <span className="inline-block w-3 h-3 rounded-full bg-cyan-500 animate-pulse mr-2.5"></span>
                  <span className="tracking-wide font-bold text-shadow-sm">
                    {currentTime.toLocaleString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="h-2 w-full bg-gray-800 relative overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-700 ease-in-out"
              style={{ width: `${timelineState.progress}%` }}
            />
          </div>
        </div>
      </div>
      
      {/* Responsive Spark Timeline Track with larger markers */}
      <div className="relative mb-10 md:mb-12 mx-auto">
        <div className="spark-timeline-track rounded-full overflow-hidden" style={{ height: "5px" }}>
          <div 
            className="timeline-progress"
            style={{ width: `${timelineState.progress}%` }}
          >
            <div className="spark-edge"></div>
            <div className="spark spark-1"></div>
            <div className="spark spark-2"></div>
            <div className="spark spark-3"></div>
          </div>
        </div>
        
        {/* Event markers with increased size for better visibility */}
        <div className="absolute top-0 left-0 right-0 h-0">
          {events.map((event, idx) => {
            const position = ((event.time.getTime() - events[0].time.getTime()) / 
              (events[events.length - 1].time.getTime() - events[0].time.getTime())) * 100;
            
            const isActive = idx === timelineState.currentEventIndex;
            const isPast = idx < timelineState.currentEventIndex;
            
            return (
              <div 
                key={idx}
                style={{ 
                  left: `${position}%`, 
                  position: 'absolute',
                  transform: 'translateX(-50%)',
                  zIndex: isActive ? 20 : 10
                }}
                onClick={() => {
                  if (timelineRef.current) {
                    const targetCard = timelineRef.current.children[idx] as HTMLElement;
                    if (targetCard) {
                      const scrollPos = targetCard.offsetLeft - timelineRef.current.clientWidth / 2 + targetCard.clientWidth / 2;
                      timelineRef.current.scrollTo({ left: scrollPos, behavior: 'smooth' });
                    }
                  }
                }}
                onMouseEnter={() => setHoveredEventIndex(idx)}
                onMouseLeave={() => setHoveredEventIndex(null)}
                className="cursor-pointer"
              >
                {isActive && (
                  <div className="marker-pulse absolute" style={{ 
                    top: '0px', 
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}></div>
                )}
                
                {/* Larger markers */}
                <div 
                  className={`timeline-marker ${
                    isActive 
                      ? 'marker-node-active' 
                      : isPast 
                        ? 'marker-node-completed' 
                        : 'marker-node-upcoming'
                  }`}
                  style={{ 
                    position: 'absolute',
                    top: '0px', 
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: isActive ? '28px' : isPast ? '24px' : '20px',
                    height: isActive ? '28px' : isPast ? '24px' : '20px'
                  }}
                ></div>
                
                {/* Larger time labels */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 text-base font-bold whitespace-nowrap">
                  <span className={`${isPast ? 'text-emerald-300' : isActive ? 'text-cyan-300' : 'text-gray-300'} font-mono text-shadow-lg tracking-wider`}>
                    {formatTimeDisplay(event.time)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Larger current time indicator */}
        {timelineState.progress > 0 && timelineState.progress < 100 && (
          <div 
            className="absolute"
            style={{ left: `${timelineState.progress}%` }}
          >
            <div className="time-indicator shadow-xl text-lg font-bold" style={{ top: "-48px", padding: "10px 14px" }}>
              {currentTime.toLocaleTimeString([], { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
              })}
            </div>
            <div className="time-indicator-line" style={{ 
              height: "42px", 
              width: "3px",
              background: "linear-gradient(to bottom, rgba(56, 189, 248, 1), rgba(56, 189, 248, 0))"
            }}></div>
          </div>
        )}
        
        {/* Larger timeline bounds display */}
        <div className="flex justify-between mt-16 px-1 text-lg font-medium text-cyan-300 font-mono relative">
          <div className="glassmorphism px-5 py-2.5 rounded shadow-glow">
            {formatTimeDisplay(events[0].time)}
          </div>
          
          {/* Larger progress percentage */}
          <div className="absolute left-1/2 -translate-x-1/2 glassmorphism px-6 py-3 rounded-full 
                         flex items-center gap-3 border border-cyan-700/30 shadow-glow">
            <div className={`h-3 w-3 rounded-full ${
              timelineState.isComplete ? 'bg-emerald-400' : 'bg-cyan-400'
            }`}></div>
            <span className="font-bold text-2xl">{Math.round(timelineState.progress)}%</span>
          </div>
          
          <div className="glassmorphism px-5 py-2.5 rounded shadow-glow">
            {formatTimeDisplay(events[events.length - 1].time)}
          </div>
        </div>
      </div>
      
      <div className="glassmorphism-deep relative overflow-hidden rounded-lg shadow-lg max-h-[32vh] md:max-h-[35vh]">
        {maxScroll > 10 && (
          <>
            <button
              onClick={() => scrollTimeline('left')}
              className={`absolute left-3 top-1/2 z-30 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full 
                bg-black/70 border border-cyan-500/40 text-cyan-400 transition-all duration-300 hover:bg-black/90 hover:text-cyan-300 hover:border-cyan-500
                ${scrollPosition <= 10 ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}
              disabled={scrollPosition <= 10}
              aria-label="Scroll left"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              onClick={() => scrollTimeline('right')}
              className={`absolute right-3 top-1/2 z-30 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full 
                bg-black/70 border border-cyan-500/40 text-cyan-400 transition-all duration-300 hover:bg-black/90 hover:text-cyan-300 hover:border-cyan-500
                ${scrollPosition >= maxScroll - 10 ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}
              disabled={scrollPosition >= maxScroll - 10}
              aria-label="Scroll right"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </>
        )}
        
        <div 
          ref={timelineRef}
          className="flex overflow-x-auto py-3 px-3 scrollbar-hide hide-scrollbar"
          onScroll={updateScrollState}
        >
          {events.map((event, idx) => (
            <div 
              key={idx}
              ref={idx === timelineState.currentEventIndex ? activeCardRef : null}
              className="timeline-card flex-shrink-0 px-2 opacity-0 animate-fade-in-up"
              style={{ 
                width: '260px', 
                marginLeft: idx === 0 ? 'calc(50% - 130px)' : '',
                marginRight: idx === events.length - 1 ? 'calc(50% - 130px)' : '',
                animationDelay: `${idx * 0.1}s`
              }}
              onMouseEnter={() => setHoveredEventIndex(idx)}
              onMouseLeave={() => setHoveredEventIndex(null)}
            >
              <TimelineCard 
                event={event}
                isActive={idx === timelineState.currentEventIndex}
                isUpcoming={idx === timelineState.upcomingEventIndex}
                isPast={idx < timelineState.currentEventIndex}
                isLast={idx === events.length - 1}
                isFirst={idx === 0}
              />
            </div>
          ))}
        </div>
        
        <div className={`absolute top-0 bottom-0 left-0 w-12 sm:w-16 bg-gradient-to-r from-black/80 to-transparent pointer-events-none transition-opacity duration-300 ${scrollPosition > 10 ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute top-0 bottom-0 right-0 w-12 sm:w-16 bg-gradient-to-l from-black/80 to-transparent pointer-events-none transition-opacity duration-300 ${scrollPosition < maxScroll - 10 ? 'opacity-100' : 'opacity-0'}`}></div>
      </div>
    </div>
  );
};

export default Timeline;

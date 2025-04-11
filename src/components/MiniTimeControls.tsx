import React, { useState, useEffect } from 'react';
import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon, ClockIcon } from './icons/Icons';

interface MiniTimeControlsProps {
  useCustomTime: boolean;
  setUseCustomTime: (use: boolean) => void;
  timeSpeed: number;
  setTimeSpeed: (speed: number) => void;
  currentTime: Date;
  setCurrentTime: (time: Date) => void;
  openFullControls: () => void;
}

const MiniTimeControls: React.FC<MiniTimeControlsProps> = ({
  useCustomTime,
  setUseCustomTime,
  timeSpeed,
  setTimeSpeed,
  currentTime,
  setCurrentTime,
  openFullControls
}) => {
  const [expanded, setExpanded] = useState(false);
  
  // Jump time by minutes
  const jumpTime = (minutes: number) => {
    const newTime = new Date(currentTime.getTime() + minutes * 60 * 1000);
    setCurrentTime(newTime);
  };
  
  // Change speed
  const cycleSpeed = () => {
    const newSpeed = timeSpeed >= 60 ? 1 : 
                     timeSpeed >= 30 ? 60 : 
                     timeSpeed >= 15 ? 30 : 
                     timeSpeed >= 5 ? 15 : 5;
    setTimeSpeed(newSpeed);
  };
  
  // Toggle custom time
  const toggleCustomTime = () => {
    setUseCustomTime(!useCustomTime);
  };
  
  // Format time for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };
  
  return (
    <div className="fixed bottom-3 left-3 z-30">
      <div className="glassmorphism-deep rounded-lg border border-cyan-800/40 shadow-lg">
        {/* Toggle button */}
        <button 
          onClick={() => setExpanded(!expanded)}
          className="p-2 rounded-lg flex items-center justify-center text-cyan-400 hover:text-cyan-300 w-full"
        >
          <ClockIcon className="h-4 w-4 mr-1.5" />
          <span className="text-xs font-medium">
            {expanded ? 'Hide Controls' : 'Time Controls'}
          </span>
        </button>
        
        {/* Expanded controls */}
        {expanded && (
          <div className="p-3 border-t border-cyan-900/30">
            {/* Current time display */}
            <div className="text-center mb-2">
              <div className="text-xs text-gray-400">
                {useCustomTime ? "Custom Time" : "Current Time"}
              </div>
              <div className="text-sm font-mono text-cyan-300">{formatTime(currentTime)}</div>
              {useCustomTime && (
                <div className="text-2xs text-cyan-400/60 mt-0.5 animate-pulse">
                  Time Control Active
                </div>
              )}
            </div>
            
            {/* Time controls */}
            <div className="flex items-center justify-between space-x-1.5 mb-2">
              <button
                onClick={() => jumpTime(-15)}
                className="flex-1 flex items-center justify-center p-1.5 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white mini-control-btn"
                title="Back 15 minutes"
              >
                <BackwardIcon className="h-3.5 w-3.5" />
                <span className="text-2xs ml-1">15m</span>
              </button>
              
              <button
                onClick={toggleCustomTime}
                className={`flex-1 p-1.5 rounded mini-control-btn ${
                  useCustomTime 
                    ? 'bg-cyan-600 text-white hover:bg-cyan-700' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                title={useCustomTime ? 'Pause time control' : 'Enable time control'}
              >
                {useCustomTime ? (
                  <PauseIcon className="h-3.5 w-3.5 mx-auto" />
                ) : (
                  <PlayIcon className="h-3.5 w-3.5 mx-auto" />
                )}
              </button>
              
              <button
                onClick={() => jumpTime(15)}
                className="flex-1 flex items-center justify-center p-1.5 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white mini-control-btn"
                title="Forward 15 minutes"
              >
                <span className="text-2xs mr-1">15m</span>
                <ForwardIcon className="h-3.5 w-3.5" />
              </button>
            </div>
            
            {/* Speed and full controls */}
            <div className="flex justify-between items-center">
              <button
                onClick={cycleSpeed}
                className={`text-2xs py-1 px-2 rounded mini-control-btn ${
                  useCustomTime ? 'bg-cyan-700/40 text-cyan-300' : 'bg-gray-800 text-gray-400'
                }`}
                title="Change simulation speed"
                disabled={!useCustomTime}
              >
                {timeSpeed}x Speed
              </button>
              
              <button
                onClick={openFullControls}
                className="text-2xs py-1 px-2 rounded bg-cyan-800/40 text-cyan-300 hover:bg-cyan-800/70 mini-control-btn"
              >
                More Controls...
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniTimeControls;

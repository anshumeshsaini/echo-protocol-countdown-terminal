import React, { useState, useRef, useEffect } from 'react';
import { FontOption } from '../utils/fonts';
import { Event } from '../data/events';
import { PlusIcon, XCircleIcon, EditIcon, SaveIcon } from './icons/Icons';

interface TestControlsProps {
  currentTime: Date;
  setCurrentTime: (time: Date) => void;
  useCustomTime: boolean;
  setUseCustomTime: (use: boolean) => void;
  timeSpeed: number;
  setTimeSpeed: (speed: number) => void;
  headingFont: FontOption;
  setHeadingFont: (font: FontOption) => void;
  availableFonts: FontOption[];
  onClose: () => void;
  events: Event[];
  setEvents: (events: Event[]) => void;
}

const TestControls: React.FC<TestControlsProps> = ({
  currentTime,
  setCurrentTime,
  useCustomTime,
  setUseCustomTime,
  timeSpeed,
  setTimeSpeed,
  headingFont,
  setHeadingFont,
  availableFonts,
  onClose,
  events,
  setEvents
}) => {
  // Active tab state
  const [activeTab, setActiveTab] = useState<'time' | 'appearance' | 'events'>('time');
  
  // Event editing states
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    description: '',
    time: new Date()
  });
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  // Focus handling for the add event form
  const titleInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isAddingEvent && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isAddingEvent]);

  // Date/time helpers
  const formatDateForInput = (date: Date) => date.toISOString().split('T')[0];
  const formatTimeForInput = (date: Date) => 
    `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  const formatTimeWithSeconds = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  // New states for improved time control
  const [timeJumpAmount, setTimeJumpAmount] = useState<number>(15);
  const [timeJumpUnit, setTimeJumpUnit] = useState<'minutes' | 'hours' | 'days'>('minutes');

  // Jump time forward or backward
  const jumpTime = (direction: 'forward' | 'backward') => {
    const multiplier = direction === 'forward' ? 1 : -1;
    let milliseconds = 0;
    
    switch (timeJumpUnit) {
      case 'minutes':
        milliseconds = timeJumpAmount * 60 * 1000 * multiplier;
        break;
      case 'hours':
        milliseconds = timeJumpAmount * 60 * 60 * 1000 * multiplier;
        break;
      case 'days':
        milliseconds = timeJumpAmount * 24 * 60 * 60 * 1000 * multiplier;
        break;
    }
    
    const newTime = new Date(currentTime.getTime() + milliseconds);
    setCurrentTime(newTime);
  };

  // Fast forward to next event
  const goToNextEvent = () => {
    const nextEvent = events.find(event => event.time > currentTime);
    if (nextEvent) {
      // Go to 1 minute before the event
      const targetTime = new Date(nextEvent.time.getTime() - 60000);
      setCurrentTime(targetTime);
    }
  };

  // Jump to specific event time
  const jumpToEventTime = (eventId: string) => {
    const targetEvent = events.find(event => event.id === eventId);
    if (targetEvent) {
      setCurrentTime(new Date(targetEvent.time));
    }
  };

  // Reset time to current real time
  const resetToRealTime = () => {
    setCurrentTime(new Date());
  };

  // Event handlers for time controls
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate.getTime())) {
      const newDateTime = new Date(currentTime);
      newDateTime.setFullYear(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
      setCurrentTime(newDateTime);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(':').map(Number);
    if (!isNaN(hours) && !isNaN(minutes)) {
      const newTime = new Date(currentTime);
      newTime.setHours(hours, minutes, 0, 0);
      setCurrentTime(newTime);
    }
  };

  const handleCustomTimeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setUseCustomTime(newValue);
  };

  // Event handlers for font selection
  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFont = availableFonts.find(font => font.id === e.target.value);
    if (selectedFont) {
      setHeadingFont(selectedFont);
    }
  };

  // Event handlers for event management
  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.time) return;
    
    const createdEvent: Event = {
      id: `event-${Date.now()}`,
      title: newEvent.title,
      description: newEvent.description || '',
      time: newEvent.time instanceof Date ? newEvent.time : new Date(newEvent.time)
    };
    
    // Add the new event and sort all events by time
    const updatedEvents = [...events, createdEvent].sort((a, b) => a.time.getTime() - b.time.getTime());
    setEvents(updatedEvents);
    
    // Reset form
    setNewEvent({ title: '', description: '', time: new Date() });
    setIsAddingEvent(false);
  };

  const handleUpdateEvent = () => {
    if (!editingEvent || !editingEvent.title || !editingEvent.time) return;
    
    const updatedEvents = events.map(event => 
      event.id === editingEvent.id ? editingEvent : event
    ).sort((a, b) => a.time.getTime() - b.time.getTime());
    
    setEvents(updatedEvents);
    setEditingEvent(null);
  };

  const handleRemoveEvent = (eventId: string) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
  };

  // Event form handlers
  const handleNewEventChange = (field: keyof Event, value: string | Date) => {
    setNewEvent(prev => ({ ...prev, [field]: value }));
  };

  const handleEditingEventChange = (field: keyof Event, value: string | Date) => {
    if (!editingEvent) return;
    setEditingEvent({ ...editingEvent, [field]: value });
  };

  const handleEventDateChange = (e: React.ChangeEvent<HTMLInputElement>, isEditMode = false) => {
    const dateValue = e.target.value;
    
    if (isEditMode && editingEvent) {
      const updatedDate = new Date(editingEvent.time);
      const [year, month, day] = dateValue.split('-').map(Number);
      updatedDate.setFullYear(year, month - 1, day);
      handleEditingEventChange('time', updatedDate);
    } else {
      const updatedDate = new Date(newEvent.time || new Date());
      const [year, month, day] = dateValue.split('-').map(Number);
      updatedDate.setFullYear(year, month - 1, day);
      handleNewEventChange('time', updatedDate);
    }
  };

  const handleEventTimeChange = (e: React.ChangeEvent<HTMLInputElement>, isEditMode = false) => {
    const timeValue = e.target.value;
    const [hours, minutes] = timeValue.split(':').map(Number);
    
    if (isEditMode && editingEvent) {
      const updatedTime = new Date(editingEvent.time);
      updatedTime.setHours(hours, minutes);
      handleEditingEventChange('time', updatedTime);
    } else {
      const updatedTime = new Date(newEvent.time || new Date());
      updatedTime.setHours(hours, minutes);
      handleNewEventChange('time', updatedTime);
    }
  };

  return (
    <div className="test-controls-overlay flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div 
        className="glassmorphism-deep w-full max-w-xl rounded-xl border border-cyan-800/40 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cyan-900/30 px-6 py-4">
          <h2 className="font-orbitron text-xl font-semibold text-cyan-300">Developer Controls</h2>
          <button 
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-cyan-900/30">
          <button
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              activeTab === 'time' 
                ? 'border-b-2 border-cyan-500 text-cyan-400' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('time')}
          >
            Time Controls
          </button>
          <button
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              activeTab === 'appearance' 
                ? 'border-b-2 border-cyan-500 text-cyan-400' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('appearance')}
          >
            Appearance
          </button>
          <button
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              activeTab === 'events' 
                ? 'border-b-2 border-cyan-500 text-cyan-400' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('events')}
          >
            Events Manager
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'time' && (
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="relative inline-block h-6 w-11 cursor-pointer rounded-full bg-gray-700">
                  <input 
                    type="checkbox" 
                    id="use-custom-time" 
                    checked={useCustomTime} 
                    onChange={handleCustomTimeToggle}
                    className="peer sr-only"
                  />
                  <span className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-gray-400 transition-all peer-checked:left-6 peer-checked:bg-cyan-400`}></span>
                </div>
                <label htmlFor="use-custom-time" className="cursor-pointer text-gray-300">
                  Enable custom time control
                </label>
              </div>
              
              {/* Current time display */}
              <div className={`p-3 bg-gray-900/60 rounded-lg border border-gray-800 ${!useCustomTime ? 'opacity-50' : ''}`}>
                <div className="text-xs uppercase text-gray-500 mb-1">Current Time</div>
                <div className="text-xl font-mono text-cyan-300 mb-2">{formatTimeWithSeconds(currentTime)}</div>
                <div className="text-xs text-gray-400">
                  {currentTime.toLocaleDateString('en-US', {
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric'
                  })}
                </div>
              </div>
              
              <div className={`space-y-4 ${!useCustomTime ? 'opacity-50 pointer-events-none' : ''}`}>
                {/* Time adjustment fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-xs text-gray-400">Date</label>
                    <input 
                      type="date" 
                      value={formatDateForInput(currentTime)} 
                      onChange={handleDateChange}
                      disabled={!useCustomTime}
                      className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-gray-400">Time</label>
                    <input 
                      type="time" 
                      value={formatTimeForInput(currentTime)} 
                      onChange={handleTimeChange}
                      disabled={!useCustomTime}
                      step="1"
                      className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
                
                {/* Time jump controls */}
                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                  <div className="text-xs uppercase text-gray-500 mb-2">Quick Time Jump</div>
                  <div className="flex items-center space-x-2 mb-3">
                    <input 
                      type="number" 
                      min="1"
                      max="1000"
                      value={timeJumpAmount}
                      onChange={(e) => setTimeJumpAmount(parseInt(e.target.value) || 1)}
                      className="w-20 rounded border border-gray-700 bg-gray-800 px-2 py-1 text-white text-sm focus:border-cyan-500 focus:outline-none"
                    />
                    
                    <select
                      value={timeJumpUnit}
                      onChange={(e) => setTimeJumpUnit(e.target.value as any)}
                      className="rounded border border-gray-700 bg-gray-800 px-2 py-1 text-white text-sm focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="minutes">Minutes</option>
                      <option value="hours">Hours</option>
                      <option value="days">Days</option>
                    </select>
                    
                    <button
                      onClick={() => jumpTime('backward')}
                      className="flex items-center rounded bg-gray-700 px-3 py-1 text-sm text-white hover:bg-gray-600"
                    >
                      <span className="mr-1">←</span> Back
                    </button>
                    
                    <button
                      onClick={() => jumpTime('forward')}
                      className="flex items-center rounded bg-cyan-700 px-3 py-1 text-sm text-white hover:bg-cyan-600"
                    >
                      Forward <span className="ml-1">→</span>
                    </button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={resetToRealTime}
                      className="flex-1 rounded bg-gray-700 px-2 py-1 text-xs text-white hover:bg-gray-600"
                    >
                      Reset to Now
                    </button>
                    
                    <button
                      onClick={goToNextEvent}
                      className="flex-1 rounded bg-cyan-700/80 px-2 py-1 text-xs text-white hover:bg-cyan-600"
                    >
                      Go to Next Event
                    </button>
                  </div>
                </div>
                
                {/* Jump to event dropdown */}
                <div>
                  <label className="mb-1 block text-xs text-gray-400">Jump to Event</label>
                  <select
                    onChange={(e) => jumpToEventTime(e.target.value)}
                    className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="">Select an event...</option>
                    {events.map(event => (
                      <option key={event.id} value={event.id}>
                        {event.title} ({new Date(event.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="mb-1 block text-xs text-gray-400">Time Speed: {timeSpeed}x</label>
                  <input 
                    type="range" 
                    min="1" 
                    max="60" 
                    value={timeSpeed} 
                    onChange={(e) => setTimeSpeed(Number(e.target.value))}
                    disabled={!useCustomTime}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700 disabled:cursor-not-allowed"
                  />
                  <div className="mt-1 flex justify-between text-xs text-gray-500">
                    <span>1x</span>
                    <span>30x</span>
                    <span>60x</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'appearance' && (
            <div className="space-y-5">
              <div>
                <label className="mb-1 block text-xs text-gray-400">Header Font</label>
                <select 
                  value={headingFont.id} 
                  onChange={handleFontChange}
                  className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                >
                  {availableFonts.map(font => (
                    <option key={font.id} value={font.id}>
                      {font.name} {font.source === 'local' ? '(Local)' : ''}
                    </option>
                  ))}
                </select>
                
                {/* Font preview */}
                <div className="mt-4 overflow-hidden rounded-lg border border-gray-700 bg-gradient-to-b from-gray-900 to-gray-950">
                  <div className="border-b border-gray-800 bg-gray-900 px-3 py-2 text-xs text-gray-400">
                    Preview
                  </div>
                  <div className="p-6">
                    <div className={`text-center text-3xl text-cyan-400 ${headingFont.className}`}>
                      IntrusionX
                    </div>
                    <div className="mt-3 text-center text-xs text-gray-500">
                      {headingFont.source === 'local' ? 'Using local font' : 'Using Google Font'}: {headingFont.name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'events' && (
            <div className="space-y-5">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium text-cyan-300">Timeline Events</h3>
                <button
                  onClick={() => {
                    setIsAddingEvent(true);
                    setNewEvent({ title: '', description: '', time: new Date() });
                  }}
                  className="flex items-center rounded-md bg-cyan-700 px-3 py-1 text-sm text-white hover:bg-cyan-600"
                  disabled={isAddingEvent || editingEvent !== null}
                >
                  <PlusIcon className="mr-1 h-4 w-4" />
                  Add Event
                </button>
              </div>
              
              {/* New Event Form */}
              {isAddingEvent && (
                <div className="rounded-lg border border-cyan-800/30 bg-gray-900 p-4">
                  <h4 className="mb-3 text-sm font-medium text-cyan-400">Add New Event</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="mb-1 block text-xs text-gray-400">Title</label>
                      <input
                        ref={titleInputRef}
                        type="text"
                        value={newEvent.title}
                        onChange={(e) => handleNewEventChange('title', e.target.value)}
                        className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                        placeholder="Event title"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-gray-400">Description</label>
                      <textarea
                        value={newEvent.description}
                        onChange={(e) => handleNewEventChange('description', e.target.value)}
                        className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                        placeholder="Event description"
                        rows={2}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1 block text-xs text-gray-400">Date</label>
                        <input
                          type="date"
                          value={formatDateForInput(newEvent.time instanceof Date ? newEvent.time : new Date())}
                          onChange={(e) => handleEventDateChange(e)}
                          className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs text-gray-400">Time</label>
                        <input
                          type="time"
                          value={formatTimeForInput(newEvent.time instanceof Date ? newEvent.time : new Date())}
                          onChange={(e) => handleEventTimeChange(e)}
                          className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        onClick={() => setIsAddingEvent(false)}
                        className="rounded bg-gray-700 px-3 py-1 text-sm text-gray-300 hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddEvent}
                        className="rounded bg-cyan-700 px-3 py-1 text-sm text-white hover:bg-cyan-600"
                        disabled={!newEvent.title}
                      >
                        Add Event
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Edit Event Form */}
              {editingEvent && (
                <div className="rounded-lg border border-cyan-800/30 bg-gray-900 p-4">
                  <h4 className="mb-3 text-sm font-medium text-cyan-400">Edit Event</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="mb-1 block text-xs text-gray-400">Title</label>
                      <input
                        type="text"
                        value={editingEvent.title}
                        onChange={(e) => handleEditingEventChange('title', e.target.value)}
                        className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-gray-400">Description</label>
                      <textarea
                        value={editingEvent.description}
                        onChange={(e) => handleEditingEventChange('description', e.target.value)}
                        className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                        rows={2}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1 block text-xs text-gray-400">Date</label>
                        <input
                          type="date"
                          value={formatDateForInput(editingEvent.time)}
                          onChange={(e) => handleEventDateChange(e, true)}
                          className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs text-gray-400">Time</label>
                        <input
                          type="time"
                          value={formatTimeForInput(editingEvent.time)}
                          onChange={(e) => handleEventTimeChange(e, true)}
                          className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        onClick={() => setEditingEvent(null)}
                        className="rounded bg-gray-700 px-3 py-1 text-sm text-gray-300 hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleUpdateEvent}
                        className="rounded bg-cyan-700 px-3 py-1 text-sm text-white hover:bg-cyan-600"
                        disabled={!editingEvent.title}
                      >
                        <SaveIcon className="mr-1 h-3.5 w-3.5 inline" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Events List */}
              <div className="mt-4 max-h-60 overflow-y-auto rounded-lg border border-gray-800 bg-gray-900/50">
                {events.length === 0 ? (
                  <div className="p-4 text-center text-sm text-gray-500">
                    No events in timeline. Add an event to get started.
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-800">
                    {events.map((event) => (
                      <li key={event.id} className="p-3 hover:bg-gray-800/50">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-cyan-400">{event.title}</h4>
                            <div className="mt-1 flex items-center text-2xs text-gray-400">
                              <span className="font-mono">
                                {new Date(event.time).toLocaleString([], {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  hour12: true
                                })}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-gray-500 line-clamp-1">{event.description}</p>
                          </div>
                          <div className="ml-4 flex flex-shrink-0 space-x-1">
                            <button
                              onClick={() => setEditingEvent(event)}
                              className="rounded p-1 text-gray-400 hover:bg-gray-700 hover:text-cyan-400"
                              title="Edit event"
                              disabled={isAddingEvent || editingEvent !== null}
                            >
                              <EditIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleRemoveEvent(event.id)}
                              className="rounded p-1 text-gray-400 hover:bg-gray-700 hover:text-red-400"
                              title="Remove event"
                              disabled={isAddingEvent || editingEvent !== null}
                            >
                              <XCircleIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="border-t border-cyan-900/30 px-6 py-4 text-right">
          <span className="mr-2 text-xs text-gray-500">Changes apply in real-time</span>
          <button
            onClick={onClose}
            className="rounded-lg bg-cyan-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-cyan-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestControls;

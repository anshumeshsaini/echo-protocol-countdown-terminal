// Hackathon event data module
// This centralizes the event data management for easier updates

export interface Event {
  id: string;
  title: string;
  description: string;
  time: Date;
}

// Initial hardcoded events with fixed dates
export const getHackathonEvents = (): Event[] => {
  // Set base date for today at 12 PM
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  
  // Set base date for tomorrow at 12 PM
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // First evaluation at 4 PM today
  const firstEvaluation = new Date(today);
  firstEvaluation.setHours(16, 0, 0, 0);
  
  // Midnight milestone
  const midnight = new Date(today);
  midnight.setDate(midnight.getDate() + 1);
  midnight.setHours(0, 0, 0, 0);
  
  // Morning check-in at 8 AM tomorrow
  const morningCheckIn = new Date(tomorrow);
  morningCheckIn.setHours(8, 0, 0, 0);
  
  // Format dates for display
  const todayFormatted = today.toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
  
  const tomorrowFormatted = tomorrow.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
  
  const events: Event[] = [
    {
      id: 'event-1',
      title: `Hackathon Kickoff (${todayFormatted})`,
      description: 'Opening ceremony and team registration. Get ready for an exciting 24 hours of innovation!',
      time: today
    },
    {
      id: 'event-2',
      title: 'First Evaluation - 4:00 PM',
      description: 'Present your initial progress and receive feedback from mentors to guide your development.',
      time: firstEvaluation
    },
    {
      id: 'event-3',
      title: 'Dinner Break',
      description: 'Take a short break to refuel. Food and refreshments will be provided.',
      time: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 19, 0, 0) // 7 PM
    },
    {
      id: 'event-4',
      title: 'Technical Workshop',
      description: 'Optional workshop on advanced techniques that might help with your projects.',
      time: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 21, 0, 0) // 9 PM
    },
    {
      id: 'event-5',
      title: 'Midnight Milestone',
      description: 'Halfway point! Take a moment to assess your progress and adjust your goals if needed.',
      time: midnight
    },
    {
      id: 'event-6',
      title: 'Late Night Snack',
      description: 'Midnight snacks to keep your energy up through the night.',
      time: new Date(midnight.getTime() + 30 * 60000) // 12:30 AM
    },
    {
      id: 'event-7',
      title: 'Morning Check-in',
      description: 'Quick status update and morning refreshments. The finish line is in sight!',
      time: morningCheckIn
    },
    {
      id: 'event-8',
      title: 'Final Hour Alert',
      description: 'One hour left! Time to finalize your projects and prepare your presentations.',
      time: new Date(tomorrow.getTime() - 60 * 60000) // 11 AM
    },
    {
      id: 'event-9',
      title: `Hackathon Ends (${tomorrowFormatted})`,
      description: 'Stop coding! Submit your projects and prepare for the final presentations.',
      time: tomorrow
    },
    {
      id: 'event-10',
      title: 'Final Presentations',
      description: 'Present your completed projects to the judges and other teams.',
      time: new Date(tomorrow.getTime() + 60 * 60000) // 1 PM
    },
    {
      id: 'event-11',
      title: 'Award Ceremony',
      description: 'Winners announcement and closing remarks. Celebrate your achievements!',
      time: new Date(tomorrow.getTime() + 2 * 60 * 60000) // 2 PM
    }
  ];
  
  return events.sort((a, b) => a.time.getTime() - b.time.getTime());
};

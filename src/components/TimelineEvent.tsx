import { motion } from 'framer-motion';

interface EventProps {
  event: {
    time: Date;
    title: string;
    description: string;
  };
  currentTime: Date;
  isActive: boolean;
  isUpcoming: boolean;
  position: 'left' | 'right';
}

const TimelineEvent = ({ event, currentTime, isActive, isUpcoming, position }: EventProps) => {
  const isPast = event.time < currentTime && !isActive;
  
  // Format the time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Determine the status color
  const getStatusColor = () => {
    if (isActive) return 'bg-cyan-400 border-cyan-200';
    if (isUpcoming) return 'bg-cyan-800 border-cyan-600';
    if (isPast) return 'bg-cyan-600 border-cyan-800';
    return 'bg-gray-700 border-gray-600';
  };

  return (
    <motion.div 
      className={`flex items-center ${position === 'left' ? 'flex-row-reverse' : 'flex-row'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`w-5/12 px-4 ${position === 'left' ? 'text-right' : 'text-left'}`}>
        <div className="text-lg font-bold text-cyan-300">{event.title}</div>
        <div className="text-sm text-gray-300">{event.description}</div>
        <div className="text-xs text-cyan-200 mt-1">{formatTime(event.time)}</div>
        {isActive && <div className="text-xs text-cyan-400 mt-1 font-bold">CURRENT</div>}
      </div>
      
      <div className="w-2/12 flex justify-center">
        <motion.div 
          className={`h-6 w-6 rounded-full border-4 z-10 ${getStatusColor()}`}
          whileHover={{ scale: 1.2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        />
      </div>
      
      <div className="w-5/12"></div>
    </motion.div>
  );
};

export default TimelineEvent;

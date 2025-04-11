import { motion } from 'framer-motion';

interface CurrentTimePinProps {
  currentTime: string;
  eventTitle: string;
}

const CurrentTimePin = ({ currentTime, eventTitle }: CurrentTimePinProps) => {
  return (
    <div className="flex flex-col items-center">
      {/* Time Box */}
      <motion.div
        className="bg-black/70 backdrop-blur-md p-2 rounded-lg border border-cyan-500 shadow-lg mb-2 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-cyan-400 font-bold text-sm tracking-wider">
          {currentTime}
        </div>
        <div className="text-white text-xs truncate max-w-[150px]">
          {eventTitle}
        </div>
      </motion.div>
      
      {/* Pin */}
      <motion.div
        className="w-6 h-6 bg-cyan-400 rounded-full shadow-glow flex items-center justify-center"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </motion.div>
      
      {/* Connecting line */}
      <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-transparent"></div>
    </div>
  );
};

export default CurrentTimePin;


export const getTimeRemainingUntilNoon = (): {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isNoon: boolean;
} => {
  const now = new Date();
  const noon = new Date(now);
  
  noon.setHours(12, 0, 0, 0);
  
  // If it's past noon, set to tomorrow's noon
  if (now >= noon) {
    noon.setDate(noon.getDate() + 1);
  }
  
  const totalSeconds = Math.floor((noon.getTime() - now.getTime()) / 1000);
  
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return {
    hours,
    minutes,
    seconds,
    totalSeconds,
    isNoon: totalSeconds <= 0
  };
};

export const formatTime = (value: number): string => {
  return value.toString().padStart(2, '0');
};

export const getCurrentTimeString = (): string => {
  const now = new Date();
  return `${formatTime(now.getHours())}:${formatTime(now.getMinutes())}:${formatTime(now.getSeconds())}`;
};

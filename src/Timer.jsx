import { useState, useEffect } from 'react';

const Timer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  return (
    <div className='text-8xl text-center font-semibold mb-5'>
      <span>{hours < 10 ? `0${hours}` : hours}</span>:
      <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:
      <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
    </div>
  );
};

export default Timer;

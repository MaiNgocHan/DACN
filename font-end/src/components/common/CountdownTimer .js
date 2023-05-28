import React, { useState, useEffect, useRef } from 'react';
import classes from './CountdownTimer.module.css';
const CountdownTimer = ({ targetMinutes, timeUp }) => {
  const endTargetTime = useRef(new Date());
  useEffect(() => {
    const newTime = new Date();
    newTime.setMinutes(newTime.getMinutes() + targetMinutes);
    endTargetTime.current = newTime;
    console.log(endTargetTime);
  }, []);

  const calculateTimeLeft = () => {
    const difference = endTargetTime.current.getTime() - new Date().getTime();
    let timeLeft = {};
  
    if (difference > 0) {
      timeLeft = {
        minutes: Math.floor(difference / (1000 * 60)),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    if (timeLeft.minutes === 0 && timeLeft.seconds === 0) {
      timeUp();
    } 

  
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  
    return () => clearInterval(interval);
  });

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div>
      <p className={classes.timeBox}>{formatTime(timeLeft.minutes)} : {formatTime(timeLeft.seconds)}</p>
    </div>
  );
};

export default CountdownTimer;

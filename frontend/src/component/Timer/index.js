import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
const Timer = ({ duration, handleRound }) => {
  const [seconds, setSeconds] = useState(duration);
  const [hasTimedOut, setHasTimedOut] = useState(false);
  useEffect(() => {
    let timer;

    if (seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0 && !hasTimedOut) {
      setHasTimedOut(true);
      toast.info("Time's up");
      handleRound();
    }

    return () => {
      clearInterval(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, seconds, hasTimedOut]);

  return <>{seconds}</>;
};

export default Timer;

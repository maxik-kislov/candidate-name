import { useState, useEffect } from 'react';

const useInterval = (delay, stop) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!stop) setCount(count + 1);
    }, delay);
    return () => clearInterval(timer);
  }, [delay, count, stop]);

  return count;
};

export default useInterval;

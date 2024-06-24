"use client";
import { useEffect, useState } from "react";

const CountUpAnimation = ({
  initialValue,
  targetValue,
  duration,
}: {
  initialValue: number;
  targetValue: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(initialValue);
  if (!duration) duration = 4000; // 4 seconds

  useEffect(() => {
    let startValue = initialValue;
    const interval = Math.floor(duration / (targetValue - initialValue));

    const counter = setInterval(() => {
      startValue += 1;
      setCount(startValue);
      if (startValue >= targetValue) {
        clearInterval(counter);
      }
    }, interval);

    return () => {
      clearInterval(counter);
    };
  }, [targetValue, initialValue]);

  return <>{count}</>;
};

export default CountUpAnimation;

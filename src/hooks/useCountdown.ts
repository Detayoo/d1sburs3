import { useEffect } from "react";

export const useCountdown = (
  seconds: number,
  setSeconds: (state: number) => void
) => {
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return { minutes, remainingSeconds };
};

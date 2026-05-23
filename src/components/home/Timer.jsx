import React, { useEffect, useState } from "react";

function Timer({ expiryDate }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const expiry = new Date(expiryDate);
      const diffInSeconds = Math.floor((expiry - now) / 1000);

      if (diffInSeconds <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor(diffInSeconds / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      const seconds = diffInSeconds % 60;

      setTimeLeft({ hours, minutes, seconds });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  return (
    <div className="de_countdown">
      <span>{timeLeft.hours.toString().padStart(1, "0")}h </span>
      <span>{timeLeft.minutes.toString().padStart(2, "0")}m </span>
      <span>{timeLeft.seconds.toString().padStart(2, "0")}s</span>
    </div>
  );
};

export default Timer;

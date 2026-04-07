import { useEffect, useState } from "react";

const CountDown = (weddingDate: Date = new Date("2026-04-11T20:30:00")) => {
  const getAlarm = (wd: Date = weddingDate) => {
    const onlyDate = new Date();
    const diff = (wd.getTime() - onlyDate.getTime()) / 1000;
    const month = Math.floor(diff / (60 * 60 * 24 * 30));
    const day = Math.floor((diff / (60 * 60 * 24)) % 30);
    const hour = Math.floor((diff / (60 * 60)) % 24);
    const min = Math.floor((diff / 60) % 60);
    const sec = Math.floor(diff % 60);

    return {
      month,
      day,
      hour,
      min,
      sec,
    };
  };
  const [timeLeft, setTimeLeft] = useState(getAlarm());
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getAlarm());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  console.log("Time Left: ", timeLeft);
  return (
    <>
      {timeLeft.month > 0
        ? `${timeLeft.month}mois ${timeLeft.day}jours ${timeLeft.hour}heures ${timeLeft.min}minutes ${timeLeft.sec}secondes`
        : timeLeft.day > 0
          ? `${timeLeft.day}jours ${timeLeft.hour}heures ${timeLeft.min}minutes ${timeLeft.sec}secondes`
          : timeLeft.hour > 0
            ? `${timeLeft.hour}heures ${timeLeft.min}minutes ${timeLeft.sec}secondes`
            : timeLeft.min > 0
              ? `${timeLeft.min}minutes ${timeLeft.sec}secondes`
              : timeLeft.sec > 0
                ? `${timeLeft.sec}secondes`
                : timeLeft.day < 0 || timeLeft.hour < 8
                  ? `Le mariage etait plein d'emotion !`
                  : `Le mariage bats son plein !`}
    </>
  );
};
export default CountDown;

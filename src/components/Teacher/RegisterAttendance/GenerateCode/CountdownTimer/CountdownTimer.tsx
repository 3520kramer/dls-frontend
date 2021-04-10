import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./styles.css";

interface IProps{
  children?: React.ReactNode,
  duration: number,
};

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const getTimeSeconds = (time: number) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time: number) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time: number) => ((time % daySeconds) / hourSeconds) | 0;

const CountdownTimer: React.FC<IProps> = ({children, duration}) => {
  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = stratTime + 243248; // use UNIX timestamp in seconds

  const remainingTime = endTime - stratTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  const circleContent = ({ remainingTime }: any) => {
    const minutes = Math.floor(remainingTime / 60)
    const seconds = remainingTime % 60
  
    return (
      <div className="timer">
        <div className="value">{minutes}:{seconds}</div>
      </div>
    );
  };

  return (
      <div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying
          duration={100}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000", 0.33]]}
          //onComplete={() => [true, 10000]}
        >
          {circleContent}
        </CountdownCircleTimer>
      </div>
  );
}

export default CountdownTimer;

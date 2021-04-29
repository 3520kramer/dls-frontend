import React, { useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./styles.css";

interface IProps{
  children?: React.ReactNode,
  duration: number,
  timestamp: Date
};

const CountdownTimer: React.FC<IProps> = ({children, duration, timestamp}) => {
  
  const circleContent = ({ remainingTime }: any) => {
    const minutes = Math.floor(remainingTime / 60)
    const seconds = remainingTime % 60
    
    return (
      <div className="timer">
        <div className="text">Expires in</div>
        <div className="time">{minutes}:{seconds <= 9 && 0}{seconds}</div>
      </div>
    );
  };

  const getDuration = () => {    
    let currentTime = new Date();
    let codeCreationTime = timestamp;
    
    let differenceInSeconds = (currentTime.getTime() - codeCreationTime.getTime()) / 1000;
    
    let durationInSeconds = (duration * 60) - differenceInSeconds;
    
    return durationInSeconds;
  }

  return (
    <div className="time-wrapper">
      <CountdownCircleTimer
        isPlaying
        duration={getDuration()}
        colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000", 0.33]]}
        //onComplete={() => [true, 10000]}
      >
        {circleContent}
      </CountdownCircleTimer>
    </div>
  );
}

export default CountdownTimer;

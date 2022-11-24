import React, { useState, useEffect } from "react";
import './Breathing.css';

const START_MINUTES = "02";
const START_SECOND = "00";
const START_DERATION = 10;

export default function Timer(props) {
  const [currentMinutes, setMinutes] = useState(START_MINUTES);
  const [currentSeconds, setSeconds] = useState(START_SECOND);
  const [isStop, setIsStop] = useState(false);
  const [duration, setDuration] = useState(START_DERATION);
  const [isRunning, setIsRunning] = useState(false);

  const startHandler = () => {
    setDuration(parseInt(START_SECOND, 10) + 60 * parseInt(START_MINUTES, 10));
    // setMinutes(60 * 5);
    // setSeconds(0);
    props.startAnimation();
    setIsRunning(true);
  };
  const stopHandler = () => {
    // stop timer
    setIsStop(true);
    props.stopAnimation();
    setIsRunning(false);
  };
  const resetHandler = () => {
    setMinutes(START_MINUTES);
    setSeconds(START_SECOND);
    setIsRunning(false);
    setIsStop(false);
    setDuration(START_DERATION);
    props.resetAnimation();
  };

  const resumeHandler = () => {
    let newDuration =
      parseInt(currentMinutes, 10) * 60 + parseInt(currentSeconds, 10);
    setDuration(newDuration);

    setIsRunning(true);
    props.resumeAnimation();
    setIsStop(false);
  };

  useEffect(() => {
    if (isRunning === true) {
      let timer = duration;
      let minutes, seconds;
      const interval = setInterval(() => {
        console.log('timer:', timer);
        if (--timer <= 0) {
          resetHandler();
        } else {
          minutes = parseInt(timer / 60, 10);
          seconds = parseInt(timer % 60, 10);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          setMinutes(minutes);
          setSeconds(seconds);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  return (
    <div className="timer">
        <div className="time">
          {currentMinutes}
          <span className="mx-3">:</span>
          {currentSeconds}
        </div>
        {!isRunning && !isStop && (
          <button
            onClick={startHandler}
            className="btn"
          >
            START
          </button>
        )}
        {isRunning && (
          <button
            onClick={stopHandler}
            className="btn"
          >
            STOP
          </button>
        )}

        {isStop && (
          <button
            onClick={resumeHandler}
            className="btn"
          >
            RESUME
          </button>
        )}

        <button
          onClick={resetHandler}
          className="btn"
          disabled={!isRunning && !isStop}
        >
          RESET
        </button>
        {/* <p>{duration}</p> */}
    </div>
  );
}

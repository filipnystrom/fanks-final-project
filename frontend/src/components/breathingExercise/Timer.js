import React, { useState, useEffect } from "react";
import './Breathing.css';

const START_MINUTES = "02";
const START_SECOND = "00";
const START_DURATION = 10;

export default function Timer(props) {
  const [currentMinutes, setMinutes] = useState(START_MINUTES);
  const [currentSeconds, setSeconds] = useState(START_SECOND);
  const [isStop, setIsStop] = useState(false);
  const [duration, setDuration] = useState(START_DURATION);
  const [isRunning, setIsRunning] = useState(false);

  const startHandler = () => {
    setTimerState(
      props.startAnimation, 
      true, 
      false, 
      parseInt(START_SECOND, 10) + 60 * parseInt(START_MINUTES, 10)
    );
  };
  const stopHandler = () => {
    setTimerState(props.stopAnimation, false, true);
  };
  const resetHandler = () => {
    setTimerState(props.resetAnimation, false, false, START_DURATION, START_MINUTES, START_SECOND);
  };

  const resumeHandler = () => {
    setTimerState(
      props.startAnimation, 
      true, 
      false, 
      parseInt(currentMinutes, 10) * 60 + parseInt(currentSeconds, 10),
      currentMinutes,
      currentSeconds
    );
  };

  const setTimerState = (callback, isRunning, isStop, duration = null, minutes = null, seconds = null) => {
    setIsRunning(isRunning);
    setIsStop(isStop);
    if (duration) {
      setDuration(duration);
    }
    if (minutes) {
      setMinutes(minutes);
    }
    if (seconds) {
      setSeconds(seconds);
    }
    callback();
  }

  useEffect(() => {
    if (isRunning === true) {
      let timer = duration;
      let minutes, seconds;
      const interval = setInterval(() => {
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
    <section className="timer">
        <div className="minutes">
          {currentMinutes}
          <span className="seconds">:</span>
          {currentSeconds}
        </div>
        {!isRunning && !isStop && (
          <button onClick={startHandler} className="btnStart">
            START
          </button>
        )}
        {isRunning && (
          <button onClick={stopHandler} className="btnStop">
            STOP
          </button>
        )}

        {isStop && (
          <button onClick={resumeHandler} className="btnResume">
            RESUME
          </button>
        )}

        <button onClick={resetHandler} className="btnReset" disabled={!isRunning && !isStop}>
          RESET
        </button>
    </section>
  );
}

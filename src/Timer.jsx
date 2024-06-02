import React, { useState, useRef } from "react";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const handleInputChange = (event) => {
    setTime(event.target.value);
  };

  const startTimer = () => {
    setIsActive(true);
    setIsPaused(true);
    intervalRef.current = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsPaused(false);
  };

  const resumeTimer = () => {
    setIsPaused(true);
    intervalRef.current = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setIsPaused(false);
    setSeconds(0);
  };

  const setTimer = () => {
    setSeconds(time);
  };

  React.useEffect(() => {
    if (seconds === 0) {
      clearInterval(intervalRef.current);
      setIsActive(false);
      setIsPaused(false);
    }
  }, [seconds]);

  return (
    <div className="timer">
      <h1>React Timer</h1>
      <input
        type="number"
        value={time}
        onChange={handleInputChange}
        placeholder="Set time in seconds"
      />
      <button onClick={setTimer}>Set</button>
      <div className="time">{seconds}s</div>
      <div className="buttons">
        {!isActive && !isPaused ? (
          <button onClick={startTimer}>Start</button>
        ) : (
          <>
            {isPaused ? (
              <button onClick={pauseTimer}>Pause</button>
            ) : (
              <button onClick={resumeTimer}>Resume</button>
            )}
          </>
        )}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;

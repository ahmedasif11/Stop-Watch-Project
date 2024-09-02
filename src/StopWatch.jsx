import React, { useState, useEffect, useRef } from "react";

function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const startTimeRef = useRef(null);
  const intervalIdRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10);
    }
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    document.querySelector(".stop-button").addEventListener("click", () => {
      document.querySelector(".start-button").classList.remove("hidden");
      document.querySelector(".stop-button").classList.add("hidden");
      document.querySelector(".reset-button").classList.remove("hidden");
    });

    document.querySelector(".start-button").addEventListener("click", () => {
      document.querySelector(".start-button").classList.add("hidden");
      document.querySelector(".stop-button").classList.remove("hidden");
      document.querySelector(".reset-button").classList.remove("hidden");
    });

    document.querySelector(".reset-button").addEventListener("click", () => {
      document.querySelector(".start-button").classList.remove("hidden");
      document.querySelector(".stop-button").classList.add("hidden");
      document.querySelector(".reset-button").classList.add("hidden");
    });
  }),
    [isRunning];

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - time;
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setIsRunning(false);
    setTime(0);
  }

  function handleHours() {
    let hours = Math.floor(time / (1000 * 60 * 60));
    if (hours > 0) {
      hours = String(hours).padStart(2, "0");
      return `${hours} : `;
    } else {
      return "";
    }
  }

  function formatTime() {
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let seconds = Math.floor((time / 1000) % 60);
    let milliseconds = Math.floor((time / 10) % 100);

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${handleHours()} ${minutes} : ${seconds} : ${milliseconds}`;
  }

  return (
    <div className="stop-watch">
      <div className="stop-watch-time">{formatTime()}</div>
      <div className="buttons">
        <button onClick={start} className="start-button">
          Startt
        </button>
        <button onClick={stop} className="stop-button hidden">
          Stop
        </button>
        <button onClick={reset} className="reset-button hidden">
          Reset
        </button>
      </div>
    </div>
  );
}

export default StopWatch;

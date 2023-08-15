import { useEffect, useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <Countdown />
      </div>
    </>
  );
}

function Countdown() {
  const initialTime = { hr: 0, min: 0, sec: 0 };
  const [time, setTime] = useState(initialTime);
  const [over, setOver] = useState(true);
  const [paused, setPaused] = useState(true);
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerEnded, setTimerEnded] = useState(true);

  const tick = () => {
    if (paused || over) {
      return;
    }

    const { hr, min, sec } = time;

    if (hr === 0 && min === 0 && sec === 0) {
      setOver(true);
      setPaused(true);
      setTimerEnded(true);
      setTimerStarted(false);
      return;
    }

    let newTime;
    if (min === 0 && sec === 0) {
      newTime = { hr: hr - 1, min: 59, sec: 59 };
    } else if (sec === 0) {
      newTime = { hr, min: min - 1, sec: 59 };
    } else {
      newTime = { hr, min, sec: sec - 1 };
    }

    setTime(newTime);
  };

  const startHandler = () => {
    setTimerStarted(true);
    setOver(false);
    setPaused(false);
    setTimerEnded(false);
  };

  const pauseHandler = () => {
    setPaused(!paused);
  };

  const cancelHandler = () => {
    setTimerStarted(false);
    setOver(true);
    setPaused(true);
    setTime(initialTime);
    setTimerEnded(true);
  };

  const formatTime = (val: any) => {
    return val.toString().padStart(2, "0");
  };

  useEffect(() => {
    const ticker = setInterval(tick, 1000);

    return () => clearInterval(ticker);
  }, [paused, over, time]);

  return (
    <>
      <div className="countdown-container">
        {timerStarted ? null : (
          <div className="time-inputs">
            <input
              type="number"
              min={0}
              max={99}
              value={time.hr}
              onChange={(e) => {
                setTime((prevTime) => ({
                  ...prevTime,
                  hr: parseInt(e.target.value),
                }));
              }}
            />
            <input
              type="number"
              min={0}
              max={59}
              value={time.min}
              onChange={(e) => {
                setTime((prevTime) => ({
                  ...prevTime,
                  min: parseInt(e.target.value),
                }));
              }}
            />
            <input
              type="number"
              value={time.sec}
              min={0}
              max={59}
              onChange={(e) => {
                setTime((prevTime) => ({
                  ...prevTime,
                  sec: parseInt(e.target.value),
                }));
              }}
            />
            <button className="start-button" onClick={startHandler}>
              Start
            </button>
          </div>
        )}
        {timerEnded ? null : (
          <div className="countdown">
            <h1>{`${formatTime(time.hr)}:${formatTime(time.min)}:${formatTime(
              time.sec
            )}`}</h1>
          </div>
        )}
        {timerStarted ? (
          <div className="controllers">
            <button onClick={pauseHandler}>
              {paused ? "Resume" : "Pause"}
            </button>
            <button onClick={cancelHandler}>Cancel</button>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default App;

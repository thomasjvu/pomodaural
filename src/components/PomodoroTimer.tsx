import React, { useEffect, useState, useRef } from "react";

interface PomodoroTimerProps {
  workTime: number;
  breakTime: number;
  isSwitched: boolean;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ workTime, breakTime, isSwitched }) => {
  const [timer, setTimer] = useState(workTime);
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isSwitched) {
      // If the switch is toggled, update the timer immediately
      setTimer(breakTime);
      setIsBreakTime(true);
    } else {
      setTimer(workTime);
      setIsBreakTime(false);
    }
  }, [isSwitched, workTime, breakTime]);

  const startPomodoro = () => {
    if (!isRunning) {
      setIsRunning(true);
      startTimer();
    }
  };

  const pausePomodoro = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current!);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current!);
    setIsRunning(false);
    setIsBreakTime(false);
    setTimer(workTime);
  };

  const switchTimer = () => {
    if (!isRunning) {
      setIsBreakTime(!isBreakTime);
      setTimer(isBreakTime ? workTime : breakTime);
    }
  };

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(intervalRef.current!);
          if (isBreakTime) {
            setIsBreakTime(false);
            setTimer(workTime);
          } else {
            setIsBreakTime(true);
            setTimer(breakTime);
          }
          setIsRunning(false);
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${displayMinutes}:${displaySeconds}`;
  };

  return (
    <div id="timer-group" className="flex flex-col gap-20 w-full justify-center items-center">
      <div className="p-10 bg-base-200 rounded w-96 flex justify-center items-center">
        <span id="timer" className="text-9xl font-display">
          {formatTime(timer)}
        </span>
      </div>
      <span id="display" className="text-7xl font-display">
        {isBreakTime ? "Break Time!" : "Work Time!"}
      </span>
      <button onClick={isRunning ? pausePomodoro : startPomodoro} className="btn rounded">
        {isRunning ? "Pause" : "Start"}
      </button>
      <button onClick={resetTimer} className="btn rounded">
        Reset
      </button>
      <button onClick={switchTimer} className="btn rounded">
        Switch Work/Break
      </button>
    </div>
  );
};

export default PomodoroTimer;


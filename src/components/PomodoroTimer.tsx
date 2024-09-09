import React, { useEffect, useState, useRef } from "react";
import { saveSession, Session } from "../utils/sessionTracker";
import { formatTime } from "../utils/time";
import ding from "../assets/sfx/ding.mp3";

interface PomodoroTimerProps {
  workTime: number;
  breakTime: number;
  frequency1: number;
  frequency2: number;
  playDingSound: boolean;
  isTracking: boolean;
  onSessionComplete: () => void;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  workTime,
  breakTime,
  frequency1,
  frequency2,
  playDingSound,
  isTracking,
  onSessionComplete,
}) => {
  // State
  const [timer, setTimer] = useState(workTime);
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  // Refs
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Progress percentage for timer circle
  const calculateProgress = () => {
    const totalTime = isBreakTime ? breakTime : workTime;
    return ((totalTime - timer) / totalTime) * 100;
  };

  // Clean up interval on component unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Reset timer when switching between work and break time
  useEffect(() => {
    setTimer(isBreakTime ? breakTime : workTime);
  }, [isBreakTime, workTime, breakTime]);

  // Start the timer
  const startTimer = () => {
    // console.log(
    //   "Starting timer. isBreakTime:",
    //   isBreakTime,
    //   "isTracking:",
    //   isTracking,
    // );
    if (!isRunning) {
      setIsRunning(true);
      if (isTracking && !startTime) {
        // console.log("Setting start time");
        setStartTime(Date.now());
      }
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            if (playDingSound && audioRef.current) {
              audioRef.current.play();
            }

            if (isBreakTime) {
              // console.log("Break time finished");
              if (isTracking && startTime) {
                const endTime = Date.now();
                const duration = Math.round((endTime - startTime) / 1000 / 60);
                const session: Session = {
                  frequency1,
                  frequency2,
                  timestamp: new Date(startTime).toLocaleString(),
                  duration: `${duration} min`,
                };
                // console.log("Saving session:", session);
                saveSession(session);
                // console.log("Calling onSessionComplete");
                onSessionComplete();
              }
              setStartTime(null);
              setIsBreakTime(false);
              return workTime;
            } else {
              console.log("Focus time finished");
              return 0;
            }
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
  };

  // Pause the timer
  const pauseTimer = () => {
    // console.log("Pausing timer");
    setIsRunning(false);
    clearInterval(intervalRef.current!);
  };

  // Reset the timer
  const resetTimer = () => {
    // console.log("Resetting timer");
    clearInterval(intervalRef.current!);
    setIsRunning(false);
    setIsBreakTime(false);
    setTimer(workTime);
    setStartTime(null);
  };

  // Switch to Break time
  const switchToBreak = () => {
    // console.log("Switching to break time");
    setIsBreakTime(true);
    setTimer(breakTime);
    setIsRunning(false);
  };

  return (
    <div
      id="timer-group"
      className="flex flex-col gap-10 w-full justify-center items-center z-0"
    >
      {/* Timer Circle */}
      <div className="relative w-64 h-64">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="5"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#4ade80"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${
              2 * Math.PI * 45 * (1 - calculateProgress() / 100)
            }`}
            transform="rotate(-90 50 50)"
          />
        </svg>
        {/* Timer Display */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="text-4xl font-bold">{formatTime(timer)}</span>
          <p className="text-lg italic pt-4">
            {isBreakTime ? "break..." : "focus..."}
          </p>
        </div>
      </div>
      {/* Timer Control Buttons */}
      <div
        id="timer-buttons"
        className="flex flex-col md:flex-row gap-5 justify-between items-center"
      >
        {(timer !== 0 || isBreakTime) && (
          <button
            onClick={isRunning ? pauseTimer : startTimer}
            className="btn rounded w-full md:w-auto"
          >
            {isRunning ? "⏸ Pause" : "⏵ Start"}
          </button>
        )}
        <button
          onClick={resetTimer}
          className="btn rounded w-full md:w-auto"
          disabled={isRunning}
        >
          ↺ Reset
        </button>
        {!isBreakTime && timer === 0 && (
          <button
            onClick={switchToBreak}
            className="btn rounded w-full md:w-auto"
          >
            Start Break
          </button>
        )}
      </div>
      {/* Audio element for the ding sound */}
      <audio ref={audioRef} src={ding} />
    </div>
  );
};

export default PomodoroTimer;

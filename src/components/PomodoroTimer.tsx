import React, { useEffect, useState, useRef } from "react";

interface PomodoroTimerProps {
    workTime: number;
    breakTime: number;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ workTime, breakTime }) => {
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
        if (isBreakTime) {
            setTimer(breakTime);
        } else {
            setTimer(workTime);
        }
    }, [isBreakTime, workTime, breakTime]);

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
            if (isBreakTime) {
                setIsBreakTime(false);
                setTimer(workTime);
            } else {
                setIsBreakTime(true);
                setTimer(breakTime);
            }
        }
    };
    const startTimer = () => {
        intervalRef.current = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer === 1) {
                    clearInterval(intervalRef.current!);
                    setIsBreakTime((prevIsBreakTime) => !prevIsBreakTime);
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
            <div className="p-10 bg-base-200 rounded w-96 flex flex-col justify-center items-center">
                <span id="timer" className="text-9xl font-display">
                    {formatTime(timer)}
                </span>
                <span id="display" className="text-xl font-display uppercase">
                    {isBreakTime ? "Break Time!" : "Work Time!"}
                </span>
            </div>
            <div id="timer-buttons" className="flex gap-5 justify-between">
                <button onClick={isRunning ? pausePomodoro : startPomodoro} className="btn rounded">
                    {isRunning ? "⏸ Pause" : "⏵ Start"}
                </button>
                <button onClick={resetTimer} className="btn rounded">
                    ↺ Reset
                </button>
                <button onClick={switchTimer} className="btn rounded">
                    ⇄ Switch Mode
                </button>
            </div>
        </div>
    );
};

export default PomodoroTimer;

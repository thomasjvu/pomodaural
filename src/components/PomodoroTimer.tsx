import React, { useEffect, useState, useRef } from "react";
import dingSound from "../assets/sfx/ding.mp3";

interface PomodoroTimerProps {
    workTime: number;
    breakTime: number;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ workTime, breakTime }) => {
    const [timer, setTimer] = useState(workTime);
    const [isBreakTime, setIsBreakTime] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [playDingSound, setPlayDingSound] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

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

    const handleDingSoundCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlayDingSound(event.target.checked);
    };

    const startTimer = () => {
        intervalRef.current = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer === 1) {
                    clearInterval(intervalRef.current!);
                    setIsRunning(false);
                    if (isBreakTime) {
                        setIsBreakTime(false);
                        setTimer(workTime);
                        if (playDingSound) {
                            playSound();
                        }
                    } else {
                        setIsBreakTime(true);
                        setTimer(breakTime);
                        if (playDingSound) {
                            playSound();
                        }
                    }
                }
                return prevTimer - 1;
            });
        }, 1000);
    };

    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
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
            {/* Clock Timer */}
            <div className="p-10 bg-base-200 rounded border border-primary-100 md:w-96 flex justify-center items-center">
                <span id="timer" className="text-7xl md:text-9xl font-display">
                    {formatTime(timer)}
                </span>
            </div>
            {/* Mode Display */}
            <div className="w-full text-center">
                <span id="mode-display" className="text-5xl md:text-7xl font-display uppercase">
                    {isBreakTime ? "Break Time!" : "Focus Time"}
                </span>
            </div>
            {/* Timer Buttons */}
            <div id="timer-buttons" className="flex flex-col md:flex-row gap-5 justify-between">
                <button onClick={isRunning ? pausePomodoro : startPomodoro} className="btn rounded">
                    {isRunning ? "⏸ Pause" : "⏵ Start"}
                </button>
                <button onClick={resetTimer} className="btn rounded">
                    ↺ Reset
                </button>
                <button onClick={switchTimer} className="btn rounded">
                    ⇄ Switch Mode
                </button>
                <div className="flex items-center gap-2">
                    <label htmlFor="ding-sound-checkbox" className="text-lg font-medium">
                        Chime:
                    </label>
                    <input
                        type="checkbox"
                        id="ding-sound-checkbox"
                        checked={playDingSound}
                        onChange={handleDingSoundCheckboxChange}
                        className="toggle"
                    />
                </div>
            </div>
            <audio ref={audioRef} src={dingSound} />
        </div>
    );
};

export default PomodoroTimer;

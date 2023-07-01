import React, { useState, useEffect } from "react";

const Binaural: React.FC = (): JSX.Element => {
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const [leftGainNode, setLeftGainNode] = useState<GainNode | undefined>(undefined);
    const [rightGainNode, setRightGainNode] = useState<GainNode | undefined>(undefined);
    const [frequency1, setFrequency1] = useState(200);
    const [frequency2, setFrequency2] = useState(210);
    const [isPlaying, setPlaying] = useState(false);
    const [oscillator1, setOscillator1] = useState<OscillatorNode | null>(null);
    const [oscillator2, setOscillator2] = useState<OscillatorNode | null>(null);

    useEffect(() => {
        const newAudioContext = new window.AudioContext();
        const newLeftGainNode = newAudioContext.createGain();
        const newRightGainNode = newAudioContext.createGain();
        newLeftGainNode.connect(newAudioContext.destination);
        newRightGainNode.connect(newAudioContext.destination);

        setAudioContext(newAudioContext);
        setLeftGainNode(newLeftGainNode);
        setRightGainNode(newRightGainNode);
    }, []);

    const updateFrequency1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setFrequency1(value);
        if (oscillator1) {
            oscillator1.frequency.setValueAtTime(value, audioContext!.currentTime);
        }
    };

    const updateFrequency2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setFrequency2(value);
        if (oscillator2) {
            oscillator2.frequency.setValueAtTime(value, audioContext!.currentTime);
        }
    };

    const handlePlay = () => {
        if (audioContext && !oscillator1 && !oscillator2 && leftGainNode && rightGainNode) {
            const newOscillator1 = audioContext.createOscillator();
            const newOscillator2 = audioContext.createOscillator();

            newOscillator1.type = "sine";
            newOscillator2.type = "sine";

            newOscillator1.frequency.setValueAtTime(frequency1, audioContext.currentTime);
            newOscillator2.frequency.setValueAtTime(frequency2, audioContext.currentTime);

            newOscillator1.connect(leftGainNode);
            newOscillator2.connect(rightGainNode);

            setOscillator1(newOscillator1);
            setOscillator2(newOscillator2);

            newOscillator1.start();
            newOscillator2.start();

            setPlaying(true);
        }
    };

    const handlePause = () => {
        if (audioContext && oscillator1 && oscillator2) {
            oscillator1.stop();
            oscillator2.stop();
            oscillator1.disconnect();
            oscillator2.disconnect();
            setOscillator1(null);
            setOscillator2(null);
        }

        setPlaying(false);
    };

    useEffect(() => {
        return () => {
            handlePause();
        };
    }, []);

    return (
        <div id="binaural-controls" className="flex flex-col gap-5">
            <div className="flex justify-between gap-20">
                <div className="flex gap-5 flex-col">
                    <label htmlFor="frequency1" className="font-mono">
                        Frequency 1:
                    </label>
                    <input
                        type="range"
                        id="frequency1Slider"
                        min="1"
                        max="1000"
                        step="1"
                        value={frequency1}
                        onChange={updateFrequency1}
                        className="range"
                    />
                    <div className="flex gap-5 justify-between font-mono items-center">
                        <input
                            type="number"
                            id="frequency1Input"
                            min="1"
                            max="20000"
                            step="1"
                            value={frequency1}
                            onChange={updateFrequency1}
                            className="input input-bordered bg-neutral text-white"
                        />
                        <span id="frequency1Value">{frequency1}Hz</span>
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <label htmlFor="frequency2" className="font-mono">
                        Frequency 2:
                    </label>
                    <input
                        type="range"
                        id="frequency2Slider"
                        min="1"
                        max="1000"
                        step="1"
                        value={frequency2}
                        onChange={updateFrequency2}
                        className="range"
                    />
                    <div className="flex gap-5 justify-between font-mono items-center">
                        <input
                            type="number"
                            id="frequency2Input"
                            min="1"
                            max="20000"
                            step="1"
                            value={frequency2}
                            onChange={updateFrequency2}
                            className="input input-bordered bg-neutral text-white"
                        />
                        <span id="frequency2Value">{frequency2}Hz</span>
                    </div>
                </div>
            </div>
            {/* play and pause buttons */}
            <div id="controls" className="flex w-full justify-between gap-5">
                {isPlaying ? (
                    <button id="pauseButton" onClick={handlePause} disabled={!isPlaying} className={`btn w-full`}>
                        ⏹ Stop
                    </button>
                ) : (
                    <button id="playButton" onClick={handlePlay} disabled={isPlaying} className={`btn w-full`}>
                        🎧 Play
                    </button>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-display">Presets</h2>
                <div id="preset-buttons" className="flex justify-between items-center gap-2">
                    <button
                        id="focusButton"
                        className="btn btn-accent"
                        onClick={() => {
                            if (isPlaying) {
                                handlePause();
                            }
                            setFrequency1(200);
                            setFrequency2(205);
                            handlePlay();
                        }}>
                        Focus
                    </button>
                    <button
                        id="relaxButton"
                        className="btn btn-accent"
                        onClick={() => {
                            if (isPlaying) {
                                handlePause();
                            }
                            setFrequency1(180);
                            setFrequency2(174);
                            handlePlay();
                        }}>
                        Relaxation
                    </button>
                    <button
                        id="meditationButton"
                        className="btn btn-accent"
                        onClick={() => {
                            if (isPlaying) {
                                handlePause();
                            }
                            setFrequency1(144);
                            setFrequency2(141);
                            handlePlay();
                        }}>
                        Meditation
                    </button>
                    <button
                        id="creativityButton"
                        className="btn btn-accent"
                        onClick={() => {
                            if (isPlaying) {
                                handlePause();
                            }
                            setFrequency1(240);
                            setFrequency2(234);
                            handlePlay();
                        }}>
                        Creativity
                    </button>
                    <button
                        id="energyButton"
                        className="btn btn-accent"
                        onClick={() => {
                            if (isPlaying) {
                                handlePause();
                            }
                            setFrequency1(240);
                            setFrequency2(244);
                            handlePlay();
                        }}>
                        Energy+
                    </button>
                    <button
                        id="sleepButton"
                        className="btn btn-accent"
                        onClick={() => {
                            if (isPlaying) {
                                handlePause();
                            }
                            setFrequency1(103);
                            setFrequency2(102);
                            handlePlay();
                        }}>
                        Sleep
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Binaural;

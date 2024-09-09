import React, { useState, useEffect } from "react";

interface BinauralProps {
  setFrequency1: (value: number) => void;
  setFrequency2: (value: number) => void;
}

const Binaural: React.FC<BinauralProps> = ({
  setFrequency1,
  setFrequency2,
}) => {
  // State for audio context and nodes
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [leftGainNode, setLeftGainNode] = useState<GainNode | undefined>(
    undefined,
  );
  const [rightGainNode, setRightGainNode] = useState<GainNode | undefined>(
    undefined,
  );
  const [_channelMerger, setChannelMerger] = useState<ChannelMergerNode | null>(
    null,
  );

  // State for frequencies, with initial values from localStorage or default values
  const [frequency1, setLocalFrequency1] = useState<number>(() => {
    const savedFrequency = localStorage.getItem("frequency1");
    return savedFrequency ? parseInt(savedFrequency) : 200;
  });
  const [frequency2, setLocalFrequency2] = useState<number>(() => {
    const savedFrequency = localStorage.getItem("frequency2");
    return savedFrequency ? parseInt(savedFrequency) : 210;
  });

  // State for play/pause mode, oscillators, and volume.
  const [isPlaying, setPlaying] = useState(false);
  const [oscillator1, setOscillator1] = useState<OscillatorNode | null>(null);
  const [oscillator2, setOscillator2] = useState<OscillatorNode | null>(null);
  const [volume, setVolume] = useState<number>(0.75); // Default volume level (50%)

  // Initialize AudioContext and nodes
  useEffect(() => {
    const newAudioContext = new window.AudioContext();
    const newLeftGainNode = newAudioContext.createGain();
    const newRightGainNode = newAudioContext.createGain();
    const newChannelMerger = newAudioContext.createChannelMerger(2);

    // Connect gain nodes to the ChannelMergerNode
    newLeftGainNode.connect(newChannelMerger, 0, 0); // Left channel
    newRightGainNode.connect(newChannelMerger, 0, 1); // Right channel
    newChannelMerger.connect(newAudioContext.destination);

    // Set state with new audio nodes
    setAudioContext(newAudioContext);
    setLeftGainNode(newLeftGainNode);
    setRightGainNode(newRightGainNode);
    setChannelMerger(newChannelMerger);
  }, []);

  // Fn: Update frequency and gain based on input
  const updateFrequency =
    (
      setFrequency: React.Dispatch<React.SetStateAction<number>>,
      oscillator: OscillatorNode | null,
      gainNode: GainNode | undefined,
      storageKey: string,
    ) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value);
      setFrequency(value);
      localStorage.setItem(storageKey, value.toString());
      if (oscillator) {
        oscillator.frequency.setValueAtTime(value, audioContext!.currentTime);
      }
      if (gainNode) {
        gainNode.gain.setValueAtTime(
          value === 0 ? 0 : 1,
          audioContext!.currentTime,
        );
      }
      if (storageKey === "frequency1") {
        setFrequency1(value);
      } else if (storageKey === "frequency2") {
        setFrequency2(value);
      }
    };

  // Update volume based on input
  useEffect(() => {
    if (leftGainNode && rightGainNode) {
      leftGainNode.gain.setValueAtTime(volume, audioContext!.currentTime);
      rightGainNode.gain.setValueAtTime(volume, audioContext!.currentTime);
    }
  }, [volume, leftGainNode, rightGainNode, audioContext]);

  // Handle play action
  const handlePlay = () => {
    if (
      audioContext &&
      !oscillator1 &&
      !oscillator2 &&
      leftGainNode &&
      rightGainNode
    ) {
      // Create and setup oscillators
      const newOscillator1 = audioContext.createOscillator();
      const newOscillator2 = audioContext.createOscillator();

      newOscillator1.type = "sine";
      newOscillator2.type = "sine";

      newOscillator1.frequency.setValueAtTime(
        frequency1,
        audioContext.currentTime,
      );
      newOscillator2.frequency.setValueAtTime(
        frequency2,
        audioContext.currentTime,
      );

      newOscillator1.connect(leftGainNode);
      newOscillator2.connect(rightGainNode);

      setOscillator1(newOscillator1);
      setOscillator2(newOscillator2);

      newOscillator1.start();
      newOscillator2.start();

      setPlaying(true);
    }
  };

  // Handle pause action
  const handlePause = () => {
    if (oscillator1) {
      oscillator1.stop();
      oscillator1.disconnect();
      setOscillator1(null);
    }
    if (oscillator2) {
      oscillator2.stop();
      oscillator2.disconnect();
      setOscillator2(null);
    }
    setPlaying(false);
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      handlePause();
    };
  }, []);

  // Render Component UI
  return (
    <div id="binaural-controls" className="flex flex-col gap-5">
      {/* Frequency Controls */}
      <div
        id="frequency-controls"
        className="flex flex-col md:flex-row justify-between gap-20"
      >
        {/* Frequency One Controls */}
        <div id="frequency-one" className="flex gap-5 flex-col">
          <label htmlFor="frequency1" className="font-mono">
            Frequency 1:
          </label>
          <input
            type="range"
            id="frequency1Slider"
            min="0"
            max="1500"
            step="1"
            value={frequency1}
            onChange={updateFrequency(
              setLocalFrequency1,
              oscillator1,
              leftGainNode,
              "frequency1",
            )}
            className="range"
          />
          <div className="flex gap-5 justify-between font-mono items-center">
            <input
              type="number"
              id="frequency1Input"
              min="0"
              max="1500"
              step="1"
              value={frequency1}
              onChange={updateFrequency(
                setLocalFrequency1,
                oscillator1,
                leftGainNode,
                "frequency1",
              )}
              className="input input-bordered bg-neutral text-white"
            />
            <span id="frequency1Value">{frequency1}Hz</span>
          </div>
        </div>
        {/* Frequency Two Controls */}
        <div id="frequency-two" className="flex flex-col gap-5">
          <label htmlFor="frequency2" className="font-mono">
            Frequency 2:
          </label>
          <input
            type="range"
            id="frequency2Slider"
            min="0"
            max="1500"
            step="1"
            value={frequency2}
            onChange={updateFrequency(
              setLocalFrequency2,
              oscillator2,
              rightGainNode,
              "frequency2",
            )}
            className="range"
          />
          <div className="flex gap-5 justify-between font-mono items-center">
            <input
              type="number"
              id="frequency2Input"
              min="0"
              max="1500"
              step="1"
              value={frequency2}
              onChange={updateFrequency(
                setLocalFrequency2,
                oscillator2,
                rightGainNode,
                "frequency2",
              )}
              className="input input-bordered bg-neutral text-white"
            />
            <span id="frequency2Value">{frequency2}Hz</span>
          </div>
        </div>
      </div>
      {/* Volume Control */}
      <div className="flex items-center gap-2">
        <label htmlFor="volume-control" className="text-lg font-medium">
          Volume:
        </label>
        <input
          type="range"
          id="volume-control"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="slider"
        />
      </div>
      {/* Play and Pause Buttons */}
      <div id="controls" className="flex w-full justify-between gap-5">
        {isPlaying ? (
          <button
            id="pauseButton"
            onClick={handlePause}
            disabled={!isPlaying}
            className={`btn w-full`}
          >
            ⏹ Stop
          </button>
        ) : (
          <button
            id="playButton"
            onClick={handlePlay}
            disabled={isPlaying}
            className={`btn w-full`}
          >
            🎧 Play
          </button>
        )}
      </div>
      {/* Preset Frequencies */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-display">Presets</h2>
        {/* Preset Frequency Buttons */}
        <div
          id="preset-buttons"
          className="flex flex-col md:flex-row justify-between items-center gap-2"
        >
          <button
            id="focusButton"
            className="btn btn-accent w-full md:w-auto"
            onClick={() => {
              if (isPlaying) {
                handlePause();
              }
              setLocalFrequency1(200);
              setLocalFrequency2(205);
              localStorage.setItem("frequency1", "200");
              localStorage.setItem("frequency2", "205");
              handlePlay();
            }}
          >
            Focus
          </button>
          <button
            id="relaxButton"
            className="btn btn-accent w-full md:w-auto"
            onClick={() => {
              if (isPlaying) {
                handlePause();
              }
              setLocalFrequency1(180);
              setLocalFrequency2(174);
              localStorage.setItem("frequency1", "180");
              localStorage.setItem("frequency2", "174");
              handlePlay();
            }}
          >
            Relaxation
          </button>
          <button
            id="meditationButton"
            className="btn btn-accent w-full md:w-auto"
            onClick={() => {
              if (isPlaying) {
                handlePause();
              }
              setLocalFrequency1(144);
              setLocalFrequency2(141);
              localStorage.setItem("frequency1", "144");
              localStorage.setItem("frequency2", "141");
              handlePlay();
            }}
          >
            Meditation
          </button>
          <button
            id="creativityButton"
            className="btn btn-accent w-full md:w-auto"
            onClick={() => {
              if (isPlaying) {
                handlePause();
              }
              setLocalFrequency1(240);
              setLocalFrequency2(234);
              localStorage.setItem("frequency1", "240");
              localStorage.setItem("frequency2", "234");
              handlePlay();
            }}
          >
            Creativity
          </button>
          <button
            id="energyButton"
            className="btn btn-accent w-full md:w-auto"
            onClick={() => {
              if (isPlaying) {
                handlePause();
              }
              setLocalFrequency1(240);
              setLocalFrequency2(244);
              localStorage.setItem("frequency1", "240");
              localStorage.setItem("frequency2", "244");
              handlePlay();
            }}
          >
            Energy+
          </button>
          <button
            id="sleepButton"
            className="btn btn-accent w-full md:w-auto"
            onClick={() => {
              if (isPlaying) {
                handlePause();
              }
              setLocalFrequency1(103);
              setLocalFrequency2(102);
              localStorage.setItem("frequency1", "103");
              localStorage.setItem("frequency2", "102");
              handlePlay();
            }}
          >
            Sleep
          </button>
        </div>
      </div>
    </div>
  );
};

export default Binaural;

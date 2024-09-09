import React, { useState, useEffect, useCallback } from "react";
import Binaural from "../components/Binaural";
import PomodoroTimer from "../components/PomodoroTimer";
import Settings from "../components/Settings";
import Layout from "../layouts/Layout";
import { getSessions, clearSessions, Session } from "../utils/sessionTracker";

const Home: React.FC = () => {
  const [isSwitched, setIsSwitched] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [playDingSound, setPlayDingSound] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [sessions, setSessions] = useState<Session[]>(getSessions());
  const [frequency1, setFrequency1] = useState<number>(() => {
    const savedFrequency = localStorage.getItem("frequency1");
    return savedFrequency ? parseInt(savedFrequency) : 200;
  });
  const [frequency2, setFrequency2] = useState<number>(() => {
    const savedFrequency = localStorage.getItem("frequency2");
    return savedFrequency ? parseInt(savedFrequency) : 210;
  });

  // Switch Pomodoro Timer Durations
  const handleSwitchTimer = () => {
    setIsSwitched((prevIsSwitched) => !prevIsSwitched);
  };

  const getCurrentDurations = () => {
    if (!isSwitched) {
      return { work: 25 * 60, break: 5 * 60 };
    } else {
      return { work: 50 * 60, break: 10 * 60 };
    }
  };

  const handleClearSessions = useCallback(() => {
    clearSessions();
    setSessions([]);
  }, []);

  const handleSessionComplete = useCallback(() => {
    console.log("handleSessionComplete called");
    setSessions(getSessions());
    console.log("Updated sessions:", sessions);
  }, [sessions]);

  useEffect(() => {
    console.log("isTracking changed:", isTracking);
    if (isTracking) {
      const currentSessions = getSessions();
      console.log("Current sessions:", currentSessions);
      setSessions(currentSessions);
    }
  }, [isTracking]);

  return (
    <Layout>
      <div
        id="page-home"
        className="flex flex-col justify-center items-center gap-10 w-1/2 py-20"
      >
        {/* Settings Popover */}
        <button
          onClick={() => setShowSettings(true)}
          className="absolute top-2 right-4 text-4xl"
        >
          ⚙️
        </button>
        {showSettings && (
          <Settings
            playDingSound={playDingSound}
            setPlayDingSound={setPlayDingSound}
            isTracking={isTracking}
            setIsTracking={setIsTracking}
            isSwitched={isSwitched}
            handleSwitchTimer={handleSwitchTimer}
            closeSettings={() => setShowSettings(false)}
            sessions={sessions}
            clearSessions={handleClearSessions}
          />
        )}
        <PomodoroTimer
          workTime={getCurrentDurations().work}
          breakTime={getCurrentDurations().break}
          frequency1={frequency1}
          frequency2={frequency2}
          playDingSound={playDingSound}
          isTracking={isTracking}
          onSessionComplete={handleSessionComplete}
        />
        <Binaural setFrequency1={setFrequency1} setFrequency2={setFrequency2} />
      </div>
    </Layout>
  );
};

export default Home;

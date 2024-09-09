import React from "react";
import SessionHistory from "./SessionHistory";
import { Session } from "../utils/sessionTracker";

interface SettingsProps {
  playDingSound: boolean;
  setPlayDingSound: (value: boolean) => void;
  isTracking: boolean;
  setIsTracking: (value: boolean) => void;
  isSwitched: boolean;
  handleSwitchTimer: () => void;
  closeSettings: () => void;
  sessions: Session[];
  clearSessions: () => void;
}

const Settings: React.FC<SettingsProps> = ({
  playDingSound,
  setPlayDingSound,
  isTracking,
  setIsTracking,
  isSwitched,
  handleSwitchTimer,
  closeSettings,
  sessions,
  clearSessions,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded shadow-lg relative max-h-[90vh] overflow-y-auto">
        <button onClick={closeSettings} className="absolute top-2 right-2">
          ✖
        </button>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <label
              htmlFor="ding-sound-checkbox"
              className="text-lg font-medium"
            >
              Chime:
            </label>
            <input
              type="checkbox"
              id="ding-sound-checkbox"
              checked={playDingSound}
              onChange={(e) => setPlayDingSound(e.target.checked)}
              className="toggle"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="tracking-checkbox" className="text-lg font-medium">
              Track Session:
            </label>
            <input
              type="checkbox"
              id="tracking-checkbox"
              checked={isTracking}
              onChange={(e) => setIsTracking(e.target.checked)}
              className="toggle"
            />
          </div>
          <button onClick={handleSwitchTimer} className="btn">
            {isSwitched ? "Switch to Short Session" : "Switch to Long Session"}
          </button>
          <SessionHistory sessions={sessions} clearSessions={clearSessions} />
        </div>
      </div>
    </div>
  );
};

export default Settings;

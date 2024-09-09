import React from "react";
import { Session } from "../utils/sessionTracker";

interface SessionHistoryProps {
  sessions: Session[];
  clearSessions: () => void;
}

const SessionHistory: React.FC<SessionHistoryProps> = ({
  sessions,
  clearSessions,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-3xl font-display">Session History</h2>
      <ul>
        {" "}
        {sessions.map((session, index) => (
          <li key={index} className="font-mono">
            {session.timestamp} - Frequ1: {session.frequency1}Hz, Freq2:{" "}
            {session.frequency2}Hz, Duration: {session.duration}
          </li>
        ))}
      </ul>
      <button onClick={clearSessions} className="btn mt-4">
        Clear Session History
      </button>
    </div>
  );
};

export default SessionHistory;

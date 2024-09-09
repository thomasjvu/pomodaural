export interface Session {
  frequency1: number;
  frequency2: number;
  timestamp: string;
  duration: string;
}

const SESSIONS_KEY = "binauralSessions";

export const getSessions = (): Session[] => {
  const sessions = localStorage.getItem(SESSIONS_KEY);
  return sessions ? JSON.parse(sessions) : [];
};

export const saveSession = (session: Session) => {
  const sessions = getSessions();
  sessions.push(session);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
};

export const clearSessions = () => {
  localStorage.removeItem(SESSIONS_KEY);
};

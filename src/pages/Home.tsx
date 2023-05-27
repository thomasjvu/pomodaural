import React, { useState } from "react";
import Binaural from "../components/Binaural";
import PomodoroTimer from "../components/PomodoroTimer";
import Layout from "../layouts/Layout";

const Home: React.FC = () => {
  const [isSwitched, setIsSwitched] = useState(false);

  const handleSwitchTimer = () => {
    setIsSwitched((prevIsSwitched) => !prevIsSwitched);
  };

  const getCurrentDurations = () => {
    if (isSwitched) {
      return { work: 50 * 60, break: 10 * 60 };
    } else {
      return { work: 25 * 60, break: 5 * 60 };
    }
  };

  return (
    <Layout>
      <div id="page-home" className="flex flex-col justify-center items-center gap-20 w-1/2">
        <div className="flex justify-between w-1/2">
          {/* <h1 className="font-display text-lg text-pink-300">Pomodaural</h1> */}
          {/* <button className="btn">Help</button> */}
        </div>
        <PomodoroTimer
          workTime={getCurrentDurations().work}
          breakTime={getCurrentDurations().break}
          isSwitched={isSwitched}
        />
        <button onClick={handleSwitchTimer} className="btn rounded">
          Switch Timer
        </button>
        <Binaural />
      </div>
    </Layout>
  );
};

export default Home;


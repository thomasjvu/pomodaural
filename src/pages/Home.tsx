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
            <div id="page-home" className="flex flex-col justify-center items-center gap-10 w-1/2 py-20">
                {isSwitched ? (
                    <button onClick={handleSwitchTimer} className="font-display uppercase tracking-wider">
                        🕑 Long Session
                    </button>
                ): (
                    <button onClick={handleSwitchTimer} className="font-display uppercase tracking-wider">
                        🕑 Short Session
                    </button>
                )}
                <PomodoroTimer workTime={getCurrentDurations().work} breakTime={getCurrentDurations().break} />
                <Binaural />
            </div>
        </Layout>
    );
};

export default Home;

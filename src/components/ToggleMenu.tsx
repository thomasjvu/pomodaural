import Logo from "./Logo";

interface ToggleMenuProps {
    isOpen: boolean;
    handleToggle: () => void;
}

const ToggleMenu: React.FC<ToggleMenuProps> = ({ isOpen, handleToggle }) => {
    return (
        <div id="toggle-menu">
            <div
                className={`sidebar ${
                    isOpen ? "fixed h-full top-0 left-0 w-1/3" : "hidden"
                } bg-neutral flex justify-center py-10`}>
                {isOpen && (
                    <div className="flex flex-col items-center gap-10 px-16 w-full">
                        <Logo />
                        <h1 className="text-white font-display uppercase text-4xl leading-loose tracking-widest">
                            Pomodaural
                        </h1>
                        <div id="about" className="flex flex-col gap-2 text-white">
                            <p>
                                Pomodaural is a Pomodoro Timer with built-in Binaural frequencies to help you completely
                                focus on the task at hand.
                            </p>
                            <h3 className="text-left text-xl font-bold uppercase font-display">What is Pomodoro?</h3>
                            <p>
                                The Pomodoro Technique is a simple yet effective method for maximizing focus and
                                reducing distrations that works by setting time in a period of 25 minutes of work and 5
                                minutes of break.
                            </p>
                            <h3 className="text-left text-xl font-bold uppercase font-display">
                                What are Binaural Beats?
                            </h3>
                            <p>
                                This is paired with Binaural Beats and research is ongoing about how they can manipulate
                                our brain states to achieve higher levels of focus and creativity depending on the
                                specific frequency.
                            </p>
                            <h3 className="text-left text-xl font-bold uppercase font-display">How to Use this App</h3>
                            <p>
                                To begin, press the play button with the preset that depicts the state you want to be
                                in, and then press start! The timer will go on for the intended duration.
                            </p>
                        </div>
                    </div>
                )}
            </div>
            <button
                className={`z-[999] toggle-button fixed top-0 left-0 p-5 ${isOpen ? "text-white" : "text-base"}`}
                onClick={handleToggle}>
                {isOpen ? "⟵ Menu" : "⟶ Menu"}
            </button>
        </div>
    );
};

export default ToggleMenu;

import React from "react";

const About: React.FC = () => {
  return (
    <div>
      <h1 className="text-justify font-display uppercase text-4xl leading-loose tracking-widest text-white font-bold">
        Pomodaural
      </h1>
      <div id="about" className="flex flex-col gap-2 text-white">
        <p className="text-justify">
          Pomodaural is the combination of the Pomodoro technique with binaural
          beats to augment focus and productivity.
        </p>
        <h3 className="text-justify text-xl font-bold uppercase font-display">
          What is Pomodoro?
        </h3>
        <p className="text-justify">
          The Pomodoro Technique is a time management method that uses a timer
          to break work into intervals, traditionally 25 minutes in length,
          separated by a short 5 minute breaks. These intervals are known as
          "pomodoros," the plural in English of the Italian word pomodoro
          (tomato).
        </p>
        <h3 className="text-justify text-xl font-bold uppercase font-display">
          What are Binaural Beats?
        </h3>
        <p className="text-justify">
          Binaural beats are an auditory illusion perceived when two different
          pure-tone sine waves, both with frequencies lower than 1500 Hz, with
          less than a 40 Hz difference between them, are listened to
          dichotically (one through each ear). Some studies suggest that
          binaural beats can help with focus, creativity, and relaxation,
          although research is ongoing.
        </p>
        <h3 className="text-left text-xl font-bold uppercase font-display">
          Quick Start
        </h3>
        <p className="text-justify">
          Put on a pair of earbuds and then press on one of the preset binaural
          beat options to output a pure binaural frequency. Once you're ready,
          click the "Play" button to begin the timer.
        </p>
      </div>
    </div>
  );
};

export default About;

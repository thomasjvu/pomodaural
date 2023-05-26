const PomodoroTimer: React.FC = (): JSX.Element => {
  let interval: NodeJS.Timeout;
  let timer: number;
  let isBreakTime: boolean;

  function startPomodoro() {
    const workTime = 1 * 60; // 1 minute in seconds
    const breakTime = 1 * 60; // 5 minutes in seconds

    const display = document.getElementById("timer") as HTMLElement;
    const displayPhase = document.getElementById("display") as HTMLElement;

    function resetTimer() {
      clearInterval(interval);
      timer = 0; // Reset the timer variable
      isBreakTime = false; // Reset the break time flag
    }

    function startTimer(display: HTMLElement) {
      interval = setInterval(function () {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;

        const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;

        display.textContent = `${displayMinutes}:${displaySeconds}`;

        --timer;

        if (timer < 0) {
          clearInterval(interval);

          if (isBreakTime) {
            displayPhase.textContent = "Done!";
            resetTimer();
          } else {
            displayPhase.textContent = "Break Time!";
            timer = breakTime;
            isBreakTime = true;
            startTimer(display);
          }
        }
      }, 1000);
    }

    resetTimer();
    displayPhase.textContent = "Work Time!";
    timer = workTime;
    isBreakTime = false;
    startTimer(display);
  }

  return (
    <div id="timer-group" className="flex flex-col gap-20 w-full justify-center items-center">
      <div className="p-10 bg-base-200 rounded w-96 flex justify-center items-center">
        <span id="timer" className="text-9xl font-display">25:00</span>
      </div>
      <span id="display" className="text-7xl font-display"></span>
      <div id="button-group" className="flex gap-5">
        <button onClick={startPomodoro} className="btn rounded">30 Min (Pomodoro)</button>
      </div>
    </div>
  );
};

export default PomodoroTimer;

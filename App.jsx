import { useState, useEffect, useRef } from "react";

function AnimatedLifePoints({ value, color }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const startValue = displayValue;
    const endValue = value;
    const duration = 500;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentValue = Math.floor(
        startValue + (endValue - startValue) * progress
      );

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <div
      className={`text-6xl font-black my-6 tabular-nums select-none ${color}`}
    >
      {displayValue}
    </div>
  );
}

export default function DuelTrackerClone() {
  const [player1LP, setPlayer1LP] = useState(8000);
  const [player2LP, setPlayer2LP] = useState(8000);
  const [history, setHistory] = useState([
    "Duel started!",
  ]);

  const lpSoundRef = useRef(null);
  const buttonSoundRef = useRef(null);

  const playLPSound = () => {
    if (lpSoundRef.current) {
      lpSoundRef.current.currentTime = 0;
      lpSoundRef.current.play();
    }
  };

  const updateLP = (player, amount) => {
    playLPSound();
    if (player === 1) {
      setPlayer1LP((prev) => Math.max(0, prev + amount));
      setHistory((prev) => [
        `Player 1 ${amount > 0 ? "gained" : "lost"} ${Math.abs(amount)} LP`,
        ...prev,
      ]);
    } else {
      setPlayer2LP((prev) => Math.max(0, prev + amount));
      setHistory((prev) => [
        `Player 2 ${amount > 0 ? "gained" : "lost"} ${Math.abs(amount)} LP`,
        ...prev,
      ]);
    }
  };

  const playButtonSound = () => {
    if (buttonSoundRef.current) {
      buttonSoundRef.current.currentTime = 0;
      buttonSoundRef.current.play();
    }
  };

  const resetDuel = () => {
    setPlayer1LP(8000);
    setPlayer2LP(8000);
    setHistory(["Duel reset!"]);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-between p-3 overflow-hidden">
      <div className="w-full h-full flex flex-col justify-between gap-4 max-w-md">
        {/* Player 1 */}
        <div className="bg-zinc-800 rounded-3xl shadow-2xl p-4 border border-zinc-700 flex flex-col items-center rotate-180">
          <h2 className="text-2xl font-bold mb-2">Player 1</h2>

          <AnimatedLifePoints
            value={player1LP}
            color="text-red-400"
          />

          <div className="grid grid-cols-3 gap-3 w-full">
            <button
              onClick={() => updateLP(1, -100)}
              className="bg-red-600 hover:bg-red-500 transition rounded-2xl py-4 text-xl font-bold"
            >
              -100
            </button>
            <button
              onClick={() => updateLP(1, -500)}
              className="bg-red-700 hover:bg-red-600 transition rounded-2xl py-4 text-xl font-bold"
            >
              -500
            </button>
            <button
              onClick={() => updateLP(1, -1000)}
              className="bg-red-800 hover:bg-red-700 transition rounded-2xl py-4 text-xl font-bold"
            >
              -1000
            </button>

            <button
              onClick={() => updateLP(1, 100)}
              className="bg-green-600 hover:bg-green-500 transition rounded-2xl py-4 text-xl font-bold"
            >
              +100
            </button>
            <button
              onClick={() => updateLP(1, 500)}
              className="bg-green-700 hover:bg-green-600 transition rounded-2xl py-4 text-xl font-bold"
            >
              +500
            </button>
            <button
              onClick={() => updateLP(1, 1000)}
              className="bg-green-800 hover:bg-green-700 transition rounded-2xl py-4 text-xl font-bold"
            >
              +1000
            </button>
          </div>

          <div className="mt-6 w-full">
            <input
              type="text"
              placeholder="Player name"
              className="w-full bg-zinc-700 rounded-xl px-4 py-3 outline-none border border-zinc-600 focus:border-red-400"
            />
          </div>
        </div>

        {/* Center controls */}
        <div className="flex flex-col gap-4 justify-center items-center rotate-90 py-10">
          <div className="bg-zinc-800 border border-zinc-700 rounded-3xl p-6 w-full shadow-2xl flex items-center justify-center min-h-[220px]">
            <button
              onClick={playButtonSound}
              className="bg-cyan-600 hover:bg-cyan-500 active:scale-95 transition-all rounded-3xl px-10 py-6 text-2xl font-black shadow-xl"
            >
              Play Sound
            </button>
          </div>

          <div className="bg-zinc-800 border border-zinc-700 rounded-3xl p-6 w-full shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Match History</h3>

            <div className="space-y-3 text-sm max-h-64 overflow-y-auto mb-4">
              {history.map((entry, index) => (
                <div key={index} className="bg-zinc-700 rounded-xl p-3">
                  {entry}
                </div>
              ))}
            </div>

            <button
              onClick={resetDuel}
              className="w-full bg-yellow-600 hover:bg-yellow-500 transition rounded-2xl py-4 font-bold text-lg"
            >
              Reset Duel
            </button>
          </div>
        </div>

        {/* Player 2 */}
        <div className="bg-zinc-800 rounded-3xl shadow-2xl p-4 border border-zinc-700 flex flex-col items-center rotate-0">
          <h2 className="text-2xl font-bold mb-2">Player 2</h2>

          <AnimatedLifePoints
            value={player2LP}
            color="text-blue-400"
          />

          <div className="grid grid-cols-3 gap-3 w-full">
            <button
              onClick={() => updateLP(2, -100)}
              className="bg-red-600 hover:bg-red-500 transition rounded-2xl py-4 text-xl font-bold"
            >
              -100
            </button>
            <button
              onClick={() => updateLP(2, -500)}
              className="bg-red-700 hover:bg-red-600 transition rounded-2xl py-4 text-xl font-bold"
            >
              -500
            </button>
            <button
              onClick={() => updateLP(2, -1000)}
              className="bg-red-800 hover:bg-red-700 transition rounded-2xl py-4 text-xl font-bold"
            >
              -1000
            </button>

            <button
              onClick={() => updateLP(2, 100)}
              className="bg-green-600 hover:bg-green-500 transition rounded-2xl py-4 text-xl font-bold"
            >
              +100
            </button>
            <button
              onClick={() => updateLP(2, 500)}
              className="bg-green-700 hover:bg-green-600 transition rounded-2xl py-4 text-xl font-bold"
            >
              +500
            </button>
            <button
              onClick={() => updateLP(2, 1000)}
              className="bg-green-800 hover:bg-green-700 transition rounded-2xl py-4 text-xl font-bold"
            >
              +1000
            </button>
          </div>

          <div className="mt-6 w-full">
            <input
              type="text"
              placeholder="Player name"
              className="w-full bg-zinc-700 rounded-xl px-4 py-3 outline-none border border-zinc-600 focus:border-blue-400"
            />
          </div>
        </div>
      </div>

      <audio
        ref={lpSoundRef}
        src="https://actions.google.com/sounds/v1/cartoon/pop.ogg"
        preload="auto"
      />

      <audio
        ref={buttonSoundRef}
        src="https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"
        preload="auto"
      />

      <footer className="mt-10 text-zinc-500 text-sm text-center">
        Inspired by a Yu-Gi-Oh! duel tracker layout.
      </footer>
    </div>
  );
}

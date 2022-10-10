import { useState, useCallback, useEffect } from "react";
import Board from "./components/board";
import Dropdown from "./components/dropdown";
import { LoadingRipple } from "./components/loading";
import "./App.css";

const App = () => {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [numRows, setNumRows] = useState(3);
  const [numCols, setNumCols] = useState(3)
  const [clicks, setNumClicks] = useState<number>(0);
  const [level, selectLevel] = useState<string>("Easy");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, [loading])

  const setEndGame = useCallback(() => {
    if (gameOver) return;
    setGameOver(true);
  }, [gameOver]);

  const setClickCount = useCallback(() => {
    setNumClicks(prev => prev + 1)
  }, []);

  //eslint-disable-next-line
  const handleLevelChange = useCallback((e: any) => {
    const { value } = e;
    switch (value) {
      case "easy":
        setNumRows(3);
        setNumCols(3);
        break;
      case "medium":
        setNumRows(5);
        setNumCols(5);
        break;
      case "hard":
        setNumRows(8);
        setNumCols(8);
        break;
      default:
        setNumRows(3);
        setNumCols(3);
        break;
    }
    selectLevel(value);
  }, [level]);

  if (loading) return <LoadingRipple />

  return (
    <div className="container w-full min-h-screen m-auto">
      <div className="flex flex-col justify-center items-center p-1 border-b-1 border-white">
        <h1 className="text-3xl uppercase text-white">Lights out</h1>
        <p className="flex justify-center items-center text-white mt-2">Welcome to Lights Out! The object of the game is to turn off all lights in as few button presses as possible.</p>
      </div>
      <main className="flex flex-col justify-center items-center h-full m-auto">
        <div className="relative h-full w-auto">
          <section className="flex flex-col items-center justify-center mb-3 mt-3">
            <label className="text-white text-lg" htmlFor="difficulty" aria-roledescription="Select your difficulty level" tabIndex={1}>Difficulty </label>
            <Dropdown
              className="min-w-content h-auto"
              aria-labelledby="difficulty"
              tabIndex={2}
              options={[
                { value: "easy", label: "Easy" },
                { value: "medium", label: "Medium" },
                { value: "hard", label: "Hard" }
              ] as Array<{ value: string, label: string }>}
              onChange={handleLevelChange}
              value={level}
            />

          </section>
        </div>
        <div className="relative h-full flex-auto">
          <section className="flex flex-col relative" id="board-container">
            <Board
              nRows={numRows} nCols={numCols}
              defaultOnPecentage={0.3} setClickCount={setClickCount}
              setEndGame={setGameOver} gameOver={gameOver}
            />
          </section>
        </div>
        <section className="container flex flex-col align-center px-5 text-center">
          <h1 className="text-white">Current Clicks: {clicks}</h1>
        </section>

      </main>
    </div>
  );
}

export default App;

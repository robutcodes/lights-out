import { useState, useCallback } from "react";
import Board from "./components/board";
import Select from "react-select";
import "./App.css";

function App() {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [numRows, setNumRows] = useState(5)
  const [numCols, setNumCols] = useState(5)
  const [clicks, setNumClicks] = useState<number>(0);
  const [selected, setSelected] = useState<string>("easy");

  const setClickCount = useCallback(() => {
    setNumClicks(prev => prev + 1)
  }, []);

  return (
    <div className="container w-full min-h-screen m-auto">
      <div className="flex justify-center items-center min-h-full h-24 p-1">
        <h1 className="text-lg uppercase text-white">Lights out</h1>
      </div>
      <main className="container grid grid-rows-2 md:grid-rows-1 grid-cols-1 md:grid-cols-3 auto-rows-min md:auto-rows-auto gap-3 border-2">
        <section className="container h-min flex flex-col items-center self-center col-span-1 md:row-span-1 relative p-3 border-2">
          <label className="text-white text-lg" htmlFor="difficulty" aria-roledescription="Select your difficulty level" tabIndex={1}>Difficulty </label>
          <Select
            className="w-full"
            aria-labelledby="difficulty"
            tabIndex={2}
            options={[
              { value: "easy", label: "Easy" },
              { value: "medium", label: "Medium" },
              { value: "hard", label: "Hard" },
            ]}
            onChange={(e) => {
              if (e) {
                setSelected(e.value);
                if (e.value === "easy") {
                  setNumRows(3);
                  setNumCols(3);
                } else if (e.value === "medium") {
                  setNumRows(5);
                  setNumCols(5);
                } else if (e.value === "hard") {
                  setNumRows(10);
                  setNumCols(10);
                }
              }
            }}
            defaultValue={{ value: "easy", label: "Easy" }}
          />
        </section>
        <section className="container col-span-1 md:col-span-2 border-2 p-1 m-auto" id="board-container">
          <Board nRows={numRows} nCols={numCols} defaultOnPecentage={0.3} setClickCount={setClickCount} />
        </section>

      </main>
      <section className="container flex flex-col align-center">
        <p className="flex justify-center align-items-center text-white">Welcome to Lights Out! The object of the game is to turn off all lights in as few button presses as possible. Good luck!</p>
        <h1>Current Clicks: {clicks}</h1>
      </section>
    </div>
  );
}

export default App;

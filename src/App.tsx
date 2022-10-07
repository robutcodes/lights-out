import React, { useState, useCallback } from "react";
import Board from "./components/board";
import Select from "react-select";
import type { OptionsOrGroups, GroupBase } from "react-select";
import type { Option } from "./types";
import "./App.css";

const defaultLevels = [
  { option: "easy", label: "Easy" },
  { option: "medium", label: "Medium" },
  { option: "hard", label: "Hard" }
]

const App = () => {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [numRows, setNumRows] = useState(3);
  const [numCols, setNumCols] = useState(3)
  const [clicks, setNumClicks] = useState<number>(0);
  const [level, selectLevel] = useState<string>("easy");

  const setClickCount = useCallback(() => {
    setNumClicks(prev => prev + 1)
  }, []);

  const changeDifficulty = useCallback((e: any) => {
    console.log(e);
    const val = e.target.value.strip();
    switch (val) {
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
    // selectLevel(val);
  }, [level]);

  return (
    <div className="container w-full min-h-screen m-auto">
      <div className="flex justify-center items-center p-1 border-b-1 border-white">
        <h1 className="text-lg uppercase text-white">Lights out</h1>
      </div>
      <main className="flex flex-col md:flex-row justify-center h-full m-auto">
        <div className="relative h-full w-auto">
          <section className="flex flex-col items-center justify-center">
            <label className="text-white text-lg" htmlFor="difficulty" aria-roledescription="Select your difficulty level" tabIndex={1}>Difficulty </label>
            <Select
              className="w-64 h-auto"
              aria-labelledby="difficulty"
              tabIndex={2}
              options={[
                { option: "easy", label: "Easy" },
                { option: "medium", label: "Medium" },
                { option: "hard", label: "Hard" }
              ] as OptionsOrGroups<Option, GroupBase<Option>>[]}
              onChange={changeDifficulty}
              value={level}
            />

          </section>
        </div>
        <div className="relative h-full">
          <section className="flex flex-col relative p-1 ml-12" id="board-container">
            <Board nRows={numRows} nCols={numCols} defaultOnPecentage={0.3} setClickCount={setClickCount} />
          </section>
        </div>

      </main>
      <section className="container flex flex-col align-center px-5 text-center">
        <p className="flex justify-center align-items-center text-white">Welcome to Lights Out! The object of the game is to turn off all lights in as few button presses as possible. Good luck!</p>
        <h1>Current Clicks: {clicks}</h1>
      </section>
    </div>
  );
}

export default App;

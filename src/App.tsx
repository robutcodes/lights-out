import React, { useState, useCallback } from "react";
import Board from './components/board';
import './App.css';

function App() {
  const [numRows, setNumRows] = useState(5)
  const [numCols, setNumCols] = useState(5)
  const [clicks, setNumClicks] = useState<number>(0);

  const setClickCount = useCallback(() => {
    console.log("clicked");
    setNumClicks(prev => prev + 1)
  }, []);

  return (
    <div className="App">
      <h1 className="lights-out-banner">Lights out!</h1>
      <main style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>

        <Board nRows={numRows} nCols={numCols} defaultOnPecentage={0.3} setClickCount={setClickCount} />
      </main>
      <div className="directions">
        <p className="flex justify-center align-items-center">Welcome to Lights Out! The object of the game is to turn off all lights in as few button presses as possible. Good luck!</p>
        <h1>Current Clicks: {clicks}</h1>
      </div>
    </div>
  );
}

export default App;

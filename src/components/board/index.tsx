import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import Cell from "../cell";
import "./Board.css";

export type BoardType = {
    nRows: number | string;
    nCols: number | string;
    defaultOnPecentage: number | string;
    setClickCount: React.SetStateAction<any>;
};

export interface BoardInterface {
    boardState: boolean[][],
    setBoardState: Dispatch<SetStateAction<boolean[][] | undefined>>,
}

const Board = ({ nRows, nCols, defaultOnPecentage, setClickCount }: BoardType) => {
    const [gameWinner, setGameWinner] = useState<boolean | undefined>(false);
    const [boardState, setBoardState] = useState<boolean[][]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [gameOver, setGameOver] = useState(false)


    useEffect(() => {
        const createGameState = () => {
            const board = [];
            for (let r = 0; r < nRows; r++) {
                const row = [];
                for (let c = 0; c < nCols; c++) {
                    row.push(Math.random() < defaultOnPecentage)
                }
                board.push(row);
            }
            return board;
        }
        if (!boardState.length) {
            const board = createGameState();
            setBoardState([...board]);
            setLoading(false);
        }
    }, [boardState]);

    const flipCells = (coord: string) => {

        const board = [...boardState];
        const [x, y] = coord.split("-").map(Number);
        const flipCell = (x: number, y: number) => {
            if (x >= 0 && x < nCols && y >= 0 && y < nRows) {
                board[x][y] = !board[x][y]
            }
        }
        flipCell(x, y);
        flipCell(x + 1, y);
        flipCell(x - 1, y);
        flipCell(x, y - 1);
        flipCell(x, y + 1);

        const winner = board.every(row => row.every(cell => !cell));
        if (winner) setGameWinner(!gameWinner);
        setBoardState([...board]);
        if (gameWinner) {
            setLoading(true);
            setGameOver(true);
        }
        if (gameOver) {
            return <h1>Game Over!</h1>;
        }
    }
    if (loading) return <h1>Loading...</h1>

    // Generates JSX for the table
    const generateBoard = () => {
        const tableBoard = [];

        for (let y = 0; y < nRows; y++) {
            const row = [];
            for (let x = 0; x < nCols; x++) {
                const coord = `${y}-${x}`;
                row.push(
                    <Cell key={coord}
                        isLit={boardState[y][x]}
                        flipCells={flipCells}
                        coord={coord}
                        setClickCount={setClickCount}
                    />
                );
            }
            tableBoard.push(<tr data-test-id="board-row" key={y}>{row}</tr>);
        }
        return tableBoard;
    }
    const tableBoard = generateBoard();
    const seekThanos = () => {
        console.log("The universe required correction.")
        const board = boardState.map(row => row.map(col => false));
        setBoardState([...board])
        setGameOver(true);
    }
    return (
        <div className="board-container">
            <table data-test-id="game-board" className="Board" >
                <tbody>{(nRows && nCols) && tableBoard}</tbody>
            </table>
            <button style={{ backgroundColor: "seagreen", border: "white" }} onClick={seekThanos}>Click me to cheat</button>
        </div>
    )

}

export default Board;
import React, { useState, useEffect, useMemo, useCallback } from "react";

import type { Dispatch, SetStateAction } from "react";
import { LoadingRipple } from "../loading";
import { createGameState } from "../../hooks/game";
import Cell from "../cell";
import "./Board.css";

declare type BoardProps = {
    nRows: number | string,
    nCols: number | string,
    defaultOnPecentage: number | string,
    setClickCount: Dispatch<SetStateAction<null>>,
    setEndGame: any,
    gameOver: boolean
};

const Board = ({ nRows, nCols, defaultOnPecentage, setClickCount, gameOver, setEndGame }: BoardProps) => {
    const [boardState, setBoardState] = useState<Array<Array<boolean>>>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(false);
    }, [loading])

    useEffect(() => {
        const game = createGameState(nRows, nCols, defaultOnPecentage);
        if (!game) {
            setLoading(true);
        } else {
            setBoardState([...game]);
            setLoading(false);
        }
    }, [nRows, nCols]);


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

        const winner = board.every(row => row.every(cell => cell === false));
        console.log(`winner: ${winner}`);
        if (winner) {
            setLoading(false);
            setEndGame();
        }
    }
    if (loading) return <LoadingRipple />
    // Generates JSX for the table
    const generateBoard = () => {
        const tableBoard = [];
        for (let r = 0; r < boardState.length; r++) {
            const row = [];
            for (let c = 0; c < boardState[r].length; c++) {
                const coord = `${r}-${c}`;
                row.push(
                    <Cell key={coord}
                        isLit={boardState[r][c]}
                        flipCells={flipCells}
                        coord={coord}
                        setClickCount={setClickCount}
                    />
                );
            }
            tableBoard.push(<tr data-test-id="board-row" key={r}>{row}</tr>);
        }
        return tableBoard;
    }

    return (
        <div className="inset-y-0 mx-auto" id="game-board">
            <table data-test-id="game-board" className="min-w-fit min-h-fit" >
                <tbody>{(nRows && nCols) && generateBoard()}</tbody>
            </table>
            <div className="container inline-flex items-center py-1">
                <button
                    className="bg-cyan-200 m-auto mt-2 p-2.5 rounded-md border-color-black"
                    onClick={setEndGame}
                >Click me to reset the universe</button>
            </div>
        </div >
    )

}

export default Board;
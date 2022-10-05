import React, { Dispatch, SetStateAction } from "react";
import "./Cell.css";

export type CellType = {
    isLit: boolean | null;
    flipCells: (coord: string) => void;
    coord: string;
    setClickCount: Dispatch<SetStateAction<null>>
};

const Cell: React.FunctionComponent<CellType> = ({ isLit, flipCells, coord, setClickCount }: CellType) => {
    const clickHandler = () => {
        setClickCount(null);
        flipCells(coord);
    }
    return (
        <td data-testid="cell"
            aria-checked={`${isLit && isLit ? true : false}`}
            className={`Cell border-inherit cell-${coord} ${isLit && isLit ? "bg-cyan-500 border-2 border-cyan-250" : "bg-gray-500 border-2 border-gray-250"}`}
            onClick={clickHandler}
        />
    )
}

export default Cell;
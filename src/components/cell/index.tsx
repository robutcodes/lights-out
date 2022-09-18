import React from "react";
import "./Cell.css";

export type CellType = {
    isLit: boolean | null;
    flipCells: (coord: string) => void;
    coord: string;
    setClickCount: any
};

const Cell: React.FunctionComponent<CellType> = ({ isLit, flipCells, coord, setClickCount }: CellType) => {
    const clickHandler = () => {
        setClickCount();
        flipCells(coord);
    }
    return (
        <td data-testid="cell"
            aria-checked={`${isLit && isLit ? true : false}`}
            className={`Cell cell-${coord} ${isLit && isLit ? " Cell-lit" : ""}`}
            onClick={clickHandler}
        />
    )
}

export default Cell;
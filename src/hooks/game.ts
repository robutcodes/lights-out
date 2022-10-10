export const createGameState = (nRows: number | string, nCols: number | string, defaultOnPecentage: number | string) => {
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


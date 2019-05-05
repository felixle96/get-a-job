/**
 * Prints every way to place a number of queens 
 * on a chess board. Does permutations (so order of)
 * moves matter
 * @param {Number} boardSize Number of spaces on a side of the board. 
 * @param {Number} numQueens Number of queens to place.
 */
function eightQueens(boardSize, numQueens) {
    let board = [];
    result = [];

    // Initialize chess board
    for (let i = 0; i < boardSize; i++) {
        board.push(Array(boardSize).fill(true));
    }

    function placeQueens(board, numQueens, moves = []) {
        if (numQueens <= 0) {   // placed all queens
            result.push(moves.slice());
            return;
        }

        // place queens on all positions that are valid;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                let isValid = board[i][j];
                if (isValid) {   // valid position to place queen
                    // place queen on a copy of the board
                    let copy = copyBoard(board);
                    placeQueen(copy, [i, j]);

                    // make the move and revert when done
                    moves.push([i, j]);
                    placeQueens(copy, numQueens - 1, moves);
                    moves.pop();
                }
            }
        }
    }

    placeQueens(board, numQueens);
    console.log('finished: ');
    return result;
}

/**
 * Prints every way to place a number of queens 
 * on a chess board. Combination wise, so only
 * the moves matter.
 * @param {Number} boardSize Number of spaces on a side of the board. 
 * @param {Number} numQueens Number of queens to place.
 */
function eightQueens1(boardSize, numQueens) {
    let board = [];
    result = [];

    // Initialize chess board
    for (let i = 0; i < boardSize; i++) {
        board.push(Array(boardSize).fill(true));
    }

    function placeQueens1(board, numQueens, moves = []) {
        if (numQueens <= 0) {   // placed all queens
            result.push(moves.slice());
            return;
        }

        // place queens on all positions that are valid;
        for (let j = 0; j < board[0].length; j++) {
            let isValid = board[numQueens - 1][j];
            if (isValid) {   // valid position to place queen
                // place queen on a copy of the board
                let copy = copyBoard(board);
                placeQueen(copy, [numQueens - 1, j]);

                // make the move and revert when done
                moves.push([numQueens - 1, j]);
                placeQueens1(copy, numQueens - 1, moves);
                moves.pop();
            }
        }
    }

    placeQueens1(board, numQueens);
    console.log('finished: ');
    return result;
}

/**
 * Place queen and update validity.
 * @param {Array<Array<Bool>>} board Chess board.
 * @param {[Number, Number]} move Where to place queen
 */
function placeQueen(board, move, fill = false) {
    let row = move[0], col = move[1];

    // update columns
    for (let c = 0; c < board[0].length; c++) {
        board[row][c] = fill;
    }

    // update rows
    for (let r = 0; r < board.length; r++) {
        board[r][col] = fill;
    }

    // update diagonals
    for (let r = row, c = col; r < board.length && c < board[0].length; r++ , c++) {
        board[r][c] = fill;
    }

    for (let r = row, c = col; r >= 0 && c >= 0; r-- , c--) {
        board[r][c] = fill;
    }

    for (let r = row, c = col; r >= 0 && c < board[0].length; r-- , c++) {
        board[r][c] = fill;
    }

    for (let r = row, c = col; r < board.length && c >= 0; r++ , c--) {
        board[r][c] = fill;
    }
}

/**
 * Make a deep copy of a board
 * @param {<Array<Array<bool>>} board Board to copy 
 */
function copyBoard(board) {
    let copy = [];

    board.forEach((arr) => {
        copy.push(arr.slice());
    });

    return copy;
}

function main() {
    let boardSize = 8;
    let numQueens = 8;

    let sol1 = eightQueens1(boardSize, numQueens);
    console.log('eightQueens1(): ');
    console.log(sol1);
    let sol = eightQueens(boardSize, numQueens);
    console.log('eightQueens(): ');
    console.log(sol);
}

main();
/**
 * Recursive approach with storage of already visited paths.
 * Time: O(rc), space: O(rc)
 * @param {*} grid 
 */
function robotInAGrid(grid) {
    let path = [{ row: 0, col: 0 }];    // initialize starting position to top left corner;
    let result = [];
    let visited = [];

    for (let row = 0; row < grid.length; row++) {
        visited.push(new Array(grid[0].length).fill(false));
    }

    function findPath(grid, path) {
        // get current position in grid
        let curr = path[path.length - 1];
        let cRow = curr.row;
        let cCol = curr.col;

        // get grid bounds
        let row = grid.length;
        let col = grid[0].length;

        // check whether grid is off limits
        let offLimits = grid[cRow][cCol];

        if (cRow >= row || cCol >= col || offLimits === true) {
            // current position is invalid, stop searching this path
            return false;
        }

        if (cRow === row - 1 && cCol === col - 1) {
            // reached destination, store path and let others know to stop searching
            result = path.slice();
            return true;
        }

        // try going right first
        if (visited[cRow][cCol + 1] === false) {    // haven't visited right path yet
            path.push({ 'row': cRow, 'col': cCol + 1 });
            visited[cRow][cCol + 1] = true;
            if (findPath(grid, path) === true) {    // check right path
                // path found return
                return true;
            }
            path.pop();
        }

        // backtrack and try going down instead
        if (visited[cRow + 1][cCol] === false) {    // haven't visited downward path yet
            path.push({ 'row': cRow + 1, 'col': cCol});
            visited[cRow + 1][cCol] = true;
            if (findPath(grid, path) === true) {    // check right path
                // path found return
                return true;
            }
            path.pop();
        }

        // no path found return false
        return false;
    }

    findPath(grid, path);

    return result;   // return empty if no path found
}
/**
 * Recursive approach (better approach) with storage of visited paths.
 * @param {} grid 
 */
function robotInAGrid1(grid) {
    let rows = grid.length;
    let cols = grid[0].length;
    let path = [];
    let visited = [];

    for (let row = 0; row < grid.length; row++) {
        visited.push(new Array(grid[0].length).fill(false));
    }

    function findPath(grid, row, col) {
        if (row < 0 || col < 0 || grid[row][col] === true || visited[row][col] === true) {    // out of bounds / off limits
            return false;
        }

        let atOrigin = (row === 0 && col === 0) ? true : false;
        if (atOrigin || findPath(grid, row, col - 1) || findPath(grid, row - 1, col)) {
            // if have route from origin/at origin store path
            path.push({'row': row, 'col': col});
            return true;
        }

        visited[row][col] = true;
        return false;
    }

    findPath(grid, rows - 1, cols - 1);
    return path;
}

function main() {
    let grid = [
        [false, true, false, false],
        [false, false, false, true],
        [false, false, false, false],
        [false, false, false, false],
        [true, false, true, true],
        [false, false, false, false],
    ]

    console.log('grid:');
    console.log(grid);
    console.log('robotInAGrid1(): ', robotInAGrid1(grid));
    console.log('robotInAGrid(): ', robotInAGrid(grid));
}

main();
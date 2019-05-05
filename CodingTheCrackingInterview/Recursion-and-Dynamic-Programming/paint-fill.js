/**
 * Color all pixels from a point in an image a new color
 * until the original color has changed. Use a BFS
 * approach.
 * @param {Array<Array<Number>>} image Image to color
 * @param {{row: Number, col: Number}} point 
 * @param {Number} newColor 
 */
function paintFill(image, point, newColor) {
    let queue = [];
    let origColor = image[point.row][point.col];
    queue.push(point);

    while (queue.length > 0) {
        // retrieve image pixel information and color it
        let pos = queue.shift();
        image[pos.row][pos.col] = newColor;

        // add adjacents of the same color to the search
        addAdjacents(image, pos, origColor, queue);
    }
}

/**
 * Add adjacent pixels of the same color to a queue.
 * @param {*} image Image we are searching.
 * @param {*} point Point to look for adjacents from.
 * @param {*} origColor Color to match to be added to queue.
 * @param {*} queue Queue to add pixel positions to.
 */
function addAdjacents(image, point, origColor, queue) {
    let numRows = image.length;
    let numCols = image[0].length;
    let row = point.row;
    let col = point.col;

    // get pixel position for adjacent pixels
    let pos = {};
    pos.top = (row > 0) ? { 'row': row - 1, 'col': col } : null;
    pos.bot = (row < numRows - 1) ? { 'row': row + 1, 'col': col } : null;
    pos.right = (col < numCols - 1) ? { 'row': row, 'col': col + 1 } : null;
    pos.left = (col > 0) ? { 'row': row, 'col': col - 1 } : null;

    /**
     * Add adjacent pixels to queue as long as their color
     * is the same as the original color.
     */
    for (prop in pos) {
        if (pos[prop] === null) {   // skip adj if doesn't exist
            continue;
        }

        let r = pos[prop].row;
        let c = pos[prop].col;

        if (image[r][c] === origColor) {    // color matches
            queue.push(pos[prop]);
        }
    }
}

function main() {
    let image = [
        [1, 1, 2, 2, 2],
        [1, 1, 2, 2, 2],
        [1, 1, 1, 2, 2],
        [1, 1, 2, 1, 1],
        [1, 1, 1, 1, 2]    
    ];
    let point = {row: 2, col: 2};
    let newColor = 4;

    console.log('image before: ', image);
    console.log(`point=${JSON.stringify(point)}, newColor=${newColor}`);

    paintFill(image, point, newColor);
    console.log('paintFill(): ');
    console.log('image after: ', image);

}

main();
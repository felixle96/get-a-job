/**
 * Solve tower of hanoi given a number of plates
 * and three stacks.
 * @param {Number} n Number of plates. 
 */
function towersOfHanoi(n) {
    /**
     * Initialize the towers of Hanoi.
     */
    let stacks = [[], [], []];
    for (let i = n; i > 0; i--) {
        stacks[0].push(i);
    }
    let count = 0;
    function solve(towers, length, src = 0, dest = 2) {
        // console.log('start towers: ', towers, ` , length=${length}, src=${src}, dest=${dest}`);
        if (length <= 0) {
            return;
        } else if (length === 1) { // only one value to move, just move it
            move(towers, src, dest);
            return;
        } else if (length === 2) {  // move two values
            let available = availableTower(src, dest);
            solve(towers, length - 1, src, available);
            move(towers, src, dest);
            move(towers, available, dest);
            return;
        } else if (length === 3) {  // move three values
            let available = availableTower(src, dest);
            solve(towers, length - 1, src, available);
            move(towers, src, dest);
            solve(towers, length - 1, available, dest);
            return;
        }

        let myCount = count++;
        let available = availableTower(src, dest);
        solve(towers, length - 1, src, available);
        // console.log('moved set, towers: ', towers, ` src=${src}, dest=${dest}, len=${length}`);
        move(towers, src, dest);

        if (length - 1 > 0) {
            console.log('start towers: ', towers, ` , length=${length - 1}, src=${src}, dest=${dest}, available=${available}`);
            solve(towers, length - 1, available, dest);
        }
    }

    solve(stacks, n);

    return stacks;
}

/**
 * Get tower index that is not being used.
 * @param {Number} src 
 * @param {Number} dest 
 */
function availableTower(src, dest) {
    let available;
    let towers = [0, 1, 2];

    towers.forEach((value) => {
        if (value !== src && value !== dest) {
            available = value;
        }
    });

    return available;
}

/**
 * Move value from one tower of Hanoi to another.
 * @param {Array<Numbers>} towers Towers of Hanoi
 * @param {Number} src Source tower to move value from.
 * @param {Number} dest Dest tower to move value to.
 */
function move(towers, src, dest) {
    // let srcVal = towers[src][towers[src].length - 1];
    // let destVal = towers[dest][towers[dest].length - 1];
    // if (srcVal !== undefined && (destVal === undefined || srcVal < destVal)) {
        towers[dest].push(towers[src].pop());
    // } 
    console.log('towers: ', towers, `, src=${src}, dest=${dest}`);
}

function main() {
    let n = 8;

    console.log('number of plates: ', n);
    console.log('towerOfHanoi(): ', towersOfHanoi(n));
}

main();
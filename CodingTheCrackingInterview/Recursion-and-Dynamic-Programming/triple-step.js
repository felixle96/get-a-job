/**
 * Recursive approach with no memoization.
 * Time: O(3^n), Space: O(n)
 * @param {*} n 
 */
function tripleStep(n) {
    let possWays = 0;

    if (n <= 0) {
        return 0;
    }

    function triple(n, i = 0) {
        if (i > n) {    // went past top of staircase
            return;
        } else if (i === n) {   // found a path
            possWays = possWays + 1;
            return;
        }

        // try one of three possible steps
        triple(n, i + 1);
        triple(n, i + 2);
        triple(n, i + 3);
    }

    triple(n);

    return possWays;
};
/**
 * Recursive approach with memoization.
 * Time: O(n), Space: O(n)
 * @param {*} n 
 */
function tripleStep1(n) {
    let count = 0;
    let paths = [1];

    if (n <= 0) {
        return 0;
    }

    function triple(n) {
        if (n < 0) {  // zero or less steps or passed end, 0 paths
            return 0;
        } 

        /**
         * Number of paths is equal to number of ways to get to current
         * step from previous three steps * the number of ways to get to
         * those previous three steps summed up:
         * O(n - 1) + O(n - 2) + O(n - 3)
         */
        if (paths[n] === undefined) {   // possible ways to this path already found
            paths[n] = triple(n - 1) + triple(n - 2) + triple(n - 3);
        } 

        return paths[n];
    }

    triple(n);

    return paths[n];
}

/**
 * Iterative approach with memoization.
 * Time: O(n), Space: O(n)
 * @param {*} n 
 */
function tripleStep2(n) {
    let paths = [1, 1, 2];

    if (n <= 0) {
        return 0;
    }

    for (let i = 3; i <= n; i++) {
        paths[i] = paths[i - 1] + paths[i - 2] + paths[i - 3];
    }

    return paths[n];
}

/**
 * Iterative approach with memoization of only previous three steps.
 * Time: O(n), Space: O(1)
 * @param {*} n 
 */
function tripleStep3(n) {
    let first = 1;
    let second  = 1;
    let third = 2;

    let current;

    if (n <= 0) {
        return 0;
    } else if (n <= 2) {
        return 1;
    }

    for (let i = 3; i <= n; i++) {
        current = first + second + third;
        first = second;
        second = third;
        third = current; 
    }

    return current;
}

function main() {
    let n = 30;

    console.log(`tripleStep3(${n}): possible ways = ${tripleStep3(n)}`);
    console.log(`tripleStep2(${n}): possible ways = ${tripleStep2(n)}`);
    console.log(`tripleStep1(${n}): possible ways = ${tripleStep1(n)}`);
    console.log(`tripleStep(${n}): possible ways = ${tripleStep(n)}`);
}

main();
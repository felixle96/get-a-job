/*******************************************************************************
 * 10.5 Sparse Search
 * Brute Force Approach:
 *  Time Complexity: O(n)
 *  Space Complexity:
 *  Make a linear pass and look for string.
 * Approach 1:
 *  Time Complexity: O(logn), O(n) worst case
 *  Space Complexity: O(logn) recursive, O(1) iterative
 * Use a modified binary search by adjusting the mid when it
 * is pointed to a empty string to the nearest non empty string.
 ******************************************************************************/

/**
 * Search sparse array of strings for a string.
 * @param {Array<string>} sparse Sparse array of strings too search.
 * @param {string} str String to search for.
 */
function sparseSearch(sparse, str) {
    function binarySearch(left, right) {
        if (left > right) { // out of bounds
            return false;
        }

        let middle = Math.floor((left + right) / 2);
        if (str === sparse[middle]) {   // found target
            return middle;
        } else if (sparse[middle] === "") { // don't know where to look b/c middle is empty
            /**
             * Search for first non empty string to set middle to.
             */
            let midLeft = middle - 1;
            let midRight = middle + 1;
            do {
                if (midLeft < left || midRight > right) {   // out of bounds
                    return false;
                } else if (sparse[midLeft] === str) {
                    return midLeft;
                } else if (sparse[midRight] === str) {
                    return midRight;
                } else if (sparse[midLeft] !== "") {
                    middle = midLeft;
                    break;
                } else if (sparse[midRight] !== "") {
                    middle = midRight;
                    break;
                }

                midLeft--, midRight++;
            } while (true);

            if (str === sparse[middle]) {   // found target string
                return middle;
            } else if (str < sparse[middle]) {  // string may only be in left half
                return binarySearch(left, middle - 1);
            } else {    // string may only be in right half
                return binarySearch(middle + 1, right);
            }
        } else if (str < sparse[middle]) {  // can confirm string may only be in left half
            return binarySearch(left, middle - 1);
        } else {    // can confirm string may only be in right half
            return binarySearch(middle + 1, right);
        }
    }

    return binarySearch(0, sparse.length - 1);
}

function main() {
    let sparse = ['at', '', '', '', 'ball', '', '', 'car', '', '', '', '', '', '', 'dad', '', '', '', 'rawr', '', '', '', 'snake', '', '', 'zebra'];

    console.log('sparse: \n', sparse);

    for (let i = 0; i < sparse.length; i++) {
        if (sparse[i] !== "") {
            let search = sparse[i];
            console.log('find: ', search, ', found: ', sparseSearch(sparse, search));
        }
    }
    console.log('find: ', "\"\"", ', found: ', sparseSearch(sparse, ""));

}

main();
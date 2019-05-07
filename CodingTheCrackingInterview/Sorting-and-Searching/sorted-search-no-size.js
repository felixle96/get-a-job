/*******************************************************************************
 * 10.4 Sorted Search, No Size:
 * Brute Force:
 *  Time Complexity: O(n)
 *  Space Complexity: O(1)
 *  Iterate through Listy one time and return index it occurs at.
 * Approach 1:
 *  Time Complexity: 
 *  Space Complexity: O(1) iterative, O(logn) recursive
 *  Do a variant of a binary search given that there is no size. Index
 *  listy at the value we are looking for. If out of bounds or value is 
 *  less than value at index then look at halfway point. If value is 
 *  greater than value at index look at double the bounds.
 * Approach 2:
 *  Time Complexity: O(logn)
 *  Space Complexity: O(1) iterative, O(logn) recursive
 *  Do a binary search by finding the size. Using an exponentional 
 *  backoff would take O(logn) instead of O(n).
 ******************************************************************************/

 /**
  * Find the index of a positive integer value in listy using a binary search.
  * @param {Object} listy Data structure that's an array with no size method, returns -1 on out of bounds.
  * @param {Number} findVal Positive integer to find. 
  */
 function sortedSearch(listy, findVal) {
    let len = findLength(listy);

    function binarySearch(left, right) {
        if (left > right) { // out of bounds
            return false;
        }

        // binary search
        let middle = Math.floor((left + right) / 2);
        if (findVal === listy[middle]) {    // found value
            return middle;
        } else if (findVal < listy[middle]) {   // val may be in left half
            return binarySearch(left, middle - 1);
        } else {    // val may be in right half
            return binarySearch(middle + 1, right);
        }
    }

    return binarySearch(0, len - 1);
 }

 /**
  * Find the length of listy using exponential backoff.
  * @param {Object} listy Listy data structure. 
  */
 function findLength(listy) {
    let maxValidIndex = 0;

    if (listy[0] === undefined) {
        // listy is empty
        return 0;
    }

    // get the power of 2 closest to the length of listy
    let base = 2, exp = 0;
    while (listy[Math.pow(base, exp)] !== undefined) {
        exp++;
    }

    exp = exp - 1;
    maxValidIndex = Math.pow(base, exp--);
    while (exp >= 0) {
        let value = listy[maxValidIndex + Math.pow(base, exp)];
        if (value !== undefined) {
            // still in bounds, keep exp the same
            maxValidIndex = maxValidIndex + Math.pow(base, exp);
        } else {
            // out of bounds, reduce exp
            exp = exp - 1;
        }
    }

    return maxValidIndex + 1;
 }

 function main() {
    let listy = new Array(10).fill(0);
    let max = 70;

    // generate random positive integer values
    listy.forEach(function (val, index) {
        this[index] = Math.floor(Math.random() * max) + 1;
    }, listy)

    // sort it
    let copy = listy.slice();
    listy.sort((a, b) => a - b);

    console.log('listy: \n', listy);
    for (let i = 0; i < copy.length; i++) {
        let findVal = copy[i];
        console.log(`sortedSearch(${findVal}): `, sortedSearch(listy, findVal));
    }
 }

 main();
/*******************************************************************************
 * 10.3 Search in Rotated Array: 
 * 
 * Brute Force Approach:
 *  Time Complexity: O(n)
 *  Space Complexity: O(1)
 *  Make a pass through the array and find the value.
 * 
 * Approach 1:
 *  Time Complexity: O(logn)
 *  Space Complexity: O(1) iterative, O(logn) recursive
 *  Do a modified binary search on the rotated array by
 *  adjusting for the rotation.
 ******************************************************************************/

/**
 * Find a value in a rotated array that was originally in sorted order.
 * 
 * @param {*} rotatedArray An array rotated an unknown number of times. 
 * @param {*} val Value to find in rotatedArray.
 */
function searchRotatedArray(rotatedArray, val) {
    function binarySearch(arr, val, left, right) {
        if (left > right) { // binary search is out of bounds
            return false;
        }

        // binary search array
        let middle = Math.floor((left + right) / 2);
        if (val === arr[middle]) {  // found value
            return middle;
        } else {
            if(left === right) {    // finished binary search but value not found
                return false;
            } else if (val < arr[middle]) { // value smaller than middle
                if (arr[left] < arr[middle]) { // rotation not in left half
                    if (val >= arr[left]) { // search left half
                        return binarySearch(arr, val, left, middle - 1);
                    } else {    // search right half
                        return binarySearch(arr, val, middle + 1, right);
                    }
                } else {    // rotation somewhere along left half
                    return binarySearch(arr, val, left, middle - 1);
                }
            } else {    // value is is larger than middle
                if (arr[right] > arr[middle]) {    // rotation not in right half
                    if (val <= arr[right]) {    // search right half
                        return binarySearch(arr, val, middle + 1, right);
                    } else {    // search left half
                        return binarySearch(arr, val, left, middle - 1);
                    }
                } else {    // rotation somewhere along right half
                    return binarySearch(arr, val, middle + 1, right);
                }
            }
        }
    }

    return binarySearch(rotatedArray, val, 0, rotatedArray.length - 1);
}

function main() {
    let rotatedArray = [15, 16, 19, 20, 25, 1, 3, 4, 5, 7, 10, 14];
    // let rotatedArray = [2, 2, 2, 3, 4, 2];

    for (let i = 0; i < rotatedArray.length; i++) {
        let find = rotatedArray[i];
        let found = searchRotatedArray(rotatedArray, find);

        console.log(`searchRotatedArray([${rotatedArray}], ${find}): `, found);
    }

    let find = 30;
    let found = searchRotatedArray(rotatedArray, find);

    console.log(`searchRotatedArray([${rotatedArray}], ${find}): `, found);
}

main();
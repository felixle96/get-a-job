/**
 * All values in sorted array are distinct.
 * @param {*} arr 
 */
function magicIndexDistinct(arr) {
    
    function binarySearch(start, end) {
        let middle = Math.floor((end - start) / 2) + start;

        if (middle < start || middle > end) {   // out of bounds
            return false;
        } 

        if (arr[middle] === middle) {   // found magic index
            return middle;
        } else if (arr[middle] > middle) {
            // search left interval
            return binarySearch(start, middle - 1);
        } else {
            // search right interval
            return binarySearch(middle + 1, end);
        }
    }

    return binarySearch(0, arr.length - 1);
}

/**
 * Values in sorted array do not need to be distinct
 * @param {*} arr 
 */
function magicIndexIndistinct(arr) {
    
    function binarySearch(start, end) {
        let middle = Math.floor((end - start) / 2) + start;

        if (middle < start || middle > end) {   // out of bounds
            return false;
        } 

        let result;
        if (arr[middle] === middle) {   // found magic index
            return middle;
        } 
        
        if (arr[middle] > middle) {
            // search left interval first
            result = binarySearch(start, middle - 1);

            if (result !== false) { // magic index found just return it
                return result;
            } else {    // not found have to search part of other interval
                // skip in between part b/c can't be there
                return binarySearch(arr[middle], end);
            }
        } else {
            // search right interval first
            result = binarySearch(middle + 1, end);

            if (result !== false) { // magic index found just return it
                return result;
            } else {    // not found have to search part of other interval
                // skip in between part b/c can't be there
                return binarySearch(start, arr[middle]);
            }
        }


    }

    return binarySearch(0, arr.length - 1);
}

function main() {
    let arr = [-5, 0, 1, 4, 5, 5, 5, 7, 10];

    console.log('arr: ', arr);
    console.log('magicIndexIndistinct(): ', magicIndexIndistinct(arr));
    console.log('magicIndexDistinct(): ', magicIndexDistinct(arr));
}

main();
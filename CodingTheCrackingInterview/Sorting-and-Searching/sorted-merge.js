/**
 * Merge two sorted arrays: B into A. Given
 * that A has enough space at the end to hold B.
 *  
 * @param {*} A Sorted array to merge B into.
 * @param {*} B Sorted array to merge into A.
 */
function sortedMerge(A, B) {
    /**
     * Iterate through A from the back, and copy values
     * from greatest to least to the back.
     */
    let i = A.length - 1;
    let j = B.length - 1;
    for (let end = A.length + B.length - 1; end >= 0; end--) {
        // get two largest/end values of A and B
        let aVal = i >= 0 ? A[i] : null;
        let bVal = j >= 0 ? B[j] : null;

        if (aVal === null || bVal > aVal) {
            // either A is empty, or B's value is greater
            // regardless, use value from B
            A[end] = B[j--];
        } else if (bVal === null || aVal > bVal) {
            // either B is empty or A's value is greater
            // regardless, use value from A
            A[end] = A[i--];
        }
    }

    return A;
}

function main() {
    let A = [1,5,9,11,13,15,16,19];
    let B = [7, 12, 14, 18, 25, 30];

    let merged = sortedMerge(A, B);
    console.log(`sortedMerge(${A}, ${B}): \n`, merged);
}

main();

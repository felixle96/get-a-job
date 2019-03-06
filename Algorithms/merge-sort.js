function MergeSort(input, left, right) {
    if (left === right) {   // only one element, need to sort
        return [input[left]];
    } else {    // merge sort by splitting input in half
        let middle = Math.floor((left + right) / 2);
        let leftHalf = MergeSort(input, left, middle); // sort left half
        let rightHalf = MergeSort(input, middle + 1, right);    // sort right half
        return merge(leftHalf, rightHalf);
    }
}

function merge(leftHalf, rightHalf) {
    let i = 0, j = 0;
    let sorted = [];
    while(i < leftHalf.length || j < rightHalf.length) {
        if (i < leftHalf.length && j < rightHalf.length) {  // compare left and right half
            if (leftHalf[i] < rightHalf[j]) {   // insert left half
                sorted.push(leftHalf[i++]);
            } else {    // insert right half
                sorted.push(rightHalf[j++]);
            }
        } else if (i < leftHalf.length) {   // insert left half
            sorted.push(leftHalf[i++]);
        } else {    // insert right half
            sorted.push(rightHalf[j++]);
        }
    }

    return sorted;
}

let array = [5,7,8,1,3,4,9,12,15,-1,-3,-4];
console.log(`MergeSort:${MergeSort(array, 0, array.length - 1)}`);
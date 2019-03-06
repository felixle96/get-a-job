function quickSort(input, start, end) {
    if (start < end) {
        let pivot = partionL(input, start, end);
        console.log(`quickSort: start=${start}, end=${end}, pivot=${pivot}, input=${input}`);

        quickSort(input, start, pivot - 1);
        quickSort(input, pivot + 1, end);
    }

    return input;
}

// Lomuto Partition Scheme
function partionL(input, start, end) {
    let pivotIndex = end;
    let pivot = input[pivotIndex];

    let i = 0, j = 0;
    while(j < end) {
        if (input[j] < pivot) { // j is less than pivot, swap with i
            let temp = input[j];
            input[j] = input[i];
            input[i] = temp;
            i++;
        }
        j++;
    }

    // swap pivot 
    let temp = input[i];
    input[i] = pivot;
    input[pivotIndex] = temp;

    return i;
}

// Hoare Partition Scheme
function partion(input, start, end) {
    let pivotIndex = pickPivot(start, end);
    let pivot = input[pivotIndex];

    // sort input array around pivot
    let i = start, j = end;
    while (i < j) {
        while(input[i] < pivot) {   // find left value greater than or equal to pivot
            i++;
        }

        while(input[j] > pivot) {   // find right value smaller than or equal to pivot
            j--;
        }

        if (i >= j) {   // if left and right indices match return
            return j;
        }

        // swap them
        let temp = input[i];
        input[i] = input[j];
        input[j] = temp;
    }
}

function pickPivot(start, end) {
    return Math.floor((start + end) / 2);
}

let array = [5,7,8,1,3,4,9,12,15,-1,-3,-4];
console.log(`QuickSort:${quickSort(array, 0, array.length - 1)}`);
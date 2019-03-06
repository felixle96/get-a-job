
function HeapSort(input) {
    // heapify input first
    BuildMaxHeap(input);

    let length = input.length;
    while(length > 1) {
        /** 
         * Move max value (at root) to current end of heap
         * and reduce its length by one and repeat
         */
        let temp = input[0];
        // console.log(`temp=${temp}, input[length - 1]=${input[length - 1]}`)

        input[0] = input[length - 1];
        input[length - 1] = temp;

        /**
         * Don't forget to sift down to repeair max heap
         */
        siftDown(input, 0, --length);
    } 

    return input;
}

function BuildMaxHeap(input) {
    let start = input.length - 1;

    while(start >= 0) {
        siftDown(input, start--, input.length);
    }

    return input;
}

function siftDown(input, start, length) {
    if (start * 2 + 1 >= length) {   // node has child
        return;
    } else {    // continue building max heap
        let left = start * 2 + 1;
        let right = start * 2 + 2;
        let root = start;
        let temp = input[start];

        if (left < length && input[left] > input[root]) {    // left child is larger than current max/root
            root = left;
        }

        if (right < length && input[right] > input[root]) {  // right child is larger than current max/root
            root = right;
        }

        // swap current max with starting node
        input[start] = input[root];
        input[root] = temp;

        if (root !== start) {
            siftDown(input, root, length);
        }

        return;
    }
}

let array = [5,7,8,1,3,4,9,12,15,-1,-3,-4];
console.log(`HeapSort: ${HeapSort(array)}`);


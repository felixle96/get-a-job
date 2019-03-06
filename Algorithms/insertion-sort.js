/**
 * Insertion sort array
 */
function InsertionSort(input) {
    for (let i = 1; i < input.length; i++) {
        let j = i - 1;
        while (j >= 0) {  // look for place with value less than input[i]
            if (input[i] > input[j]) {  // found location to insert input[i] in
                break;
            }
            j--;
        }

        // insert input[i] in front of input[j]
        input.splice(j + 1, 0, input[i]);   // insert value
        input.splice(i + 1, 1); // delete value
    }

    return input;
}

let array = [5,7,8,1,3,4,9,12,15,-1,-3,-4];
console.log(`InsertionSort:${InsertionSort(array)}`);
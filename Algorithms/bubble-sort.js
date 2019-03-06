/**
 * Bubble sort an array
 */
function BubbleSort(input) {
    let flipped;

    do {
        flipped = false;
        for (let i = 0; i + 1 < input.length; i++) {    // sort adj values
            if (input[i] > input[i + 1]) {  // swap values
                let temp = input[i];
                input[i] = input[i + 1];
                input[i + 1] = temp;
                flipped = true;
            }
        }
    } while(flipped === true);

    return input;
}

let array = [5,7,8,1,3,4,9,12,15,-1,-3,-4];
console.log(`BubbleSort:${BubbleSort(array)}`);
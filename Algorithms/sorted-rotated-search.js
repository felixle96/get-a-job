// /**
//  * @param input Array
//  * @param target Number
//  */
function BinarySearch(input, target) {
    let left = 0, right = input.length - 1;
    while(left <= right) {
        let middle = Math.round((right + left) / 2);
        if (input[middle] === target) { // found target
            return true;    
        } else if (input[left] < input[middle]) {   // pivot is right of middle 
            if (target < input[middle]) {   // target is less than middle
                if (target < input[left]) {    // target is in right section
                    left = middle + 1;
                } else {    // target is in left section
                    right = middle - 1;
                }
            } else {    // target is greater than middle
                // search right
                left = middle + 1;
            }
        } else if (input[left] > input[middle]) {   // pivot is left of middle
            if (target < input[middle]) {   // target is less than middle
                // search left
                right = middle - 1;    
            } else {    // target is greater than middle
                if (target < input[left]) {   // target is in right section
                    left = middle + 1;
                } else {    // target is in left section
                    right = middle - 1;
                }
            }
        } else {
            return false;
        }
    }

    return false;
}

let array1 = [5, 6, 8, 9, 10, 1, 2, 3,];
let array2 = [9, 10, 1, 2, 3, 5, 6, 7, ];
let array3 = [1,2,3,4,5,6,7,8,9,10];
let arrayFalse = [16, 7, -4, 3, 4,];

array3.forEach(function(val) {
    console.log(`val=${val}, input1=${array3}, return=${BinarySearch(array3, val)}`);
});

arrayFalse.forEach(function(val) {
    console.log(`val=${val}, input2=${array2}, return=${BinarySearch(array2, val)}`);
});
// /**
//  * @param input Array
//  * @param target Number
//  */
// function BinarySearch(input, target) {
//     // sort input
//     input.sort(function (a, b) {
//         return a - b;
//     });

//     if (input[input.length - 1] < target || input[0] > target) {
//         console.log(false);
//         return false;
//     }

//     console.log(`input.length=${input.length}, input=${input}`)
//     for (let start = 0, end = input.length - 1; start !== Math.floor((end - start) / 2) + start;) {    // split search into intervals
//         let middle = Math.floor((end - start) / 2) + start;
//         console.log(`target=${target}, start=${start}, middle=${middle}, end=${end}, input[start]=${input[start]}, input[middle]=${input[middle]}, input[end]=${input[end]}, `);
//         if (target === input[middle] || target === input[end] || target === input) { // found target
//             console.log(true);
//             return true;
//         } else if (target > input[middle]) {    // target may be in upper bounds of array
//             start = middle;
//         } else {    // target may be in lower bounds of array
//             end = middle;
//         }
//     }

//     console.log(false);
//     return false;   // target not found
// }

// /**
//  * @param input Array
//  * @param target Number
//  */
function BinarySearch(input, target) {
    // sort input
    input.sort(function(a, b) {
        return a - b;
    })
    console.log(`target=${target}, input=${input}`);
    let left = 0, right = input.length - 1;
    while(right >= left) {
        let middle = Math.round((right + left) / 2);
        if (input[middle] === target) { // found target
            return true;    
        } else if (input[middle] > target) {    // search lower half
            right = middle - 1;
        } else {    // search upper half
            left = middle + 1;
        }
    }

    return false;
}

function RecursiveBinarySearch(input, left, right, target) {
    let middle = left + Math.floor((right - left) / 2);

    if (left <= right) {
        if (target === input[middle]) {
            return true;
        } else if (target < input[middle]) {    // search lower half
            return RecursiveBinarySearch(input, left, middle - 1, target);
        } else {   // search upper half
            return RecursiveBinarySearch(input, middle + 1, right, target);
        }
    } else {
        return false;
    }
}

let array = [1,5,9,13,2,4,6,8,12,14,3];
let arrayFalse = [16, 7, -4, 3];
// array.forEach(function(val, i) {
//     console.log(BinarySearch(array, val));
// });

// arrayFalse.forEach(function(val, i) {
//     console.log(BinarySearch(array, val));
// });

array.forEach(function(val, i) {
    console.log(RecursiveBinarySearch(array.sort(function(a, b) {
        return a - b;
    }), 0, array.length - 1, val));
});

arrayFalse.forEach(function(val, i) {
    console.log(RecursiveBinarySearch(array.sort(function(a,b) {
        return a - b;
    }), 0, array.length - 1, val));
});
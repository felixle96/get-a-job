function interpolationSort(input, target) {
    let lo = 0;
    let hi = input.length - 1;
    let pos = lo + Math.floor((target - input[lo]) * (hi - lo) / (input[hi] - input[lo]));

    while (lo <= hi && target >= input[lo] && target <= input[hi]) { // verify target is still possible
        let curr = input[pos];

        if (target === curr) {  // found target 
            return true;
        }

        if (target < curr) {    // target may be in left portion
            hi = pos - 1;
        } else {    // target may be in right portion
            lo = pos + 1;
        }

        pos = lo + Math.floor((target - input[lo]) * (hi - lo) / (input[hi] - input[lo]));
    }

    return false;
}

function recursiveInterpolationSort(input, target, lo, hi) {
    let pos = lo + Math.floor((target - input[lo]) * (hi - lo) / (input[hi] - input[lo]));

    if (lo <= hi && target >= input[lo] && target <= input[hi]) {   // target is still possible
        if (target === input[pos]) {
            return true;
        }
        if (target < input[pos]) {  // target may be in left portion
            return recursiveInterpolationSort(input, target, lo, pos - 1);
        } else {    // target may be in right portion
            return recursiveInterpolationSort(input, target, pos + 1, hi);
        }
    }

    return false;
}

let array = [1, 5, 9, 13, 2, 4, 6, 8, 12, 14, 3];
let arrayFalse = [16, 7, -4, 3];

array.forEach(function (val, i) {
    console.log(recursiveInterpolationSort(array.sort(function (a, b) {
        return a - b;
    }), val, 0, array.length - 1));
});

// arrayFalse.forEach(function(val, i) {
//     console.log(RecursiveBinarySearch(array.sort(function(a,b) {
//         return a - b;
//     }), 0, array.length - 1, val));
// });
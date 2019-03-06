function twoSumClosest(input, sum) {
    let left = 0, right = input.length - 1; 
    let minDiff = Number.POSITIVE_INFINITY;
    let pair = [null, null, null, null];

    while(left < right) {   // sliding window on sorted array
        let pairSum = input[left] + input[right];
        let diff = Math.abs(pairSum - sum);
        if (diff < minDiff) {   // found new min diff pair
            minDiff = diff;
            pair = [left, right, input[left], input[right]];
        }

        if (pairSum < sum) {    // move left window
            left++;
        } else {    // move right window
            right--;
        }

    }

    return pair;
}

let array = [1, 5, 9, 13, 2, 4, 6, 8, 12, 14, 3];
array.sort((a,b) => a - b);
let sum = 4;
console.log(`twoSumClosest(input: ${array}, sum=${sum}): ${twoSumClosest(array, sum)}`);

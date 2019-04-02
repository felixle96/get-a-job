/**
 * Find all subsets of a set by generating all subsequences
 * and storing all the subsets.
 * @param {Array<Number>} set Set to find power set of. 
 */
function powerSet(set) {

    function getAllSubsequences(set, subsequences = [[]], curr = [], start = 0) {
        if (start >= set.length) {
            return subsequences;
        }
        /**
         * Add a value to current sequence and generate subsequences again.
         */
        for (let i = start; i < set.length; i++) {
            // add to subset and store
            curr.push(set[i]);  
            subsequences.push(curr.slice());
            // create more subsequences from current subset
            getAllSubsequences(set, subsequences, curr, i + 1);
            // revert changes to subset
            curr.pop();
        }

        return subsequences;
    }

    return getAllSubsequences(set);
}

function powerSet1(set) {
    let copy = set.slice();
    let result = [[]];

    function createSubsets(set, result) {
        if (set.length === 0) { // set is empty, return
            return;
        } 

        /**
         * Set is not empty, remove one value from it and
         * add it to all of the currently found subsets.
         */
        let newVal = set.shift();
        let currLen = result.length;    // store len b/c it will change
        for (let i = 0; i < currLen; i++) {   
            // add new val to every subset to generate a new subset
            let copy = result[i].slice();
            copy.push(newVal);
            result.push(copy);
        }

        // generate all subsets from current subset
        createSubsets(set, result);
    }

    createSubsets(copy, result);
    return result;
}

function main() {
    let arr = [1, 2, 5, 7, 9];

    console.log('set: ', arr);
    console.log('powerSet1: ', powerSet1(arr), ', length: ', powerSet1(arr).length);
    console.log('powerSet: ', powerSet(arr), ', length: ', powerSet(arr).length);
}

main();
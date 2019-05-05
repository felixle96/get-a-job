/**
 * Computes the number of ways to paranthesize/group up
 * a boolean expression to get a desired result.
 * @param {*} expression 
 * @param {*} result 
 */
function booleanEvaluation(expression, result) {
    let cache = {
        true: new Map(),
        false: new Map()
    }
    
    let numWays = countEvals(expression, result, cache);
    console.log('cache: ', cache);

    return numWays;
}

/**
 * Takes a boolean expression and tries every possible 
 * partition of the operators for a desired result.
 * @param {*} s 
 * @param {*} result 
 */
function countEvals(s, result, cache) {
    if (s.length === 0) {
        return 0;
    } else if (s.length === 1) {
        return result === stringToBool(s) ? 1 : 0;
    }

    let cacheResult = cache[result].get(s);
    if (cacheResult !== undefined) {    // value is hashed
        return cacheResult;
    }
    /**
     * For every operator (should be at an odd index),
     * separate its arguements into the left and right 
     * portion. Evaluate this portion.
     */
    let numWays = 0;
    for (let i = 1; i < s.length; i += 2) {
        // Get left and right arguments of operator
        let operator = s.charAt(i);
        let left = s.substring(0, i);
        let right = s.substring(i + 1);
        
        // computes the number of ways to get a result
        numWays += eval(left, right, operator, result, cache);
    }

    // store values before returning
    cache[result].set(s, numWays);
    return numWays;
}

/**
 * Give a right and left argument to an operator and a desired results,
 * computes the possible ways to get that result.
 * @param {*} left 
 * @param {*} right 
 * @param {*} operator 
 * @param {*} result 
 */
function eval(left, right, operator, result, cache) {
    let total = 0;

    if (result === true) {  // desired result is true
        switch (operator) {
            case "&":
                total += countEvals(left, true, cache) * countEvals(right, true, cache);
                break;
            case "|":
                total += countEvals(left, true, cache) * countEvals(right, false, cache);
                total += countEvals(left, false, cache) * countEvals(right, true, cache);
                total += countEvals(left, true, cache) * countEvals(right, true, cache);
                break;
            case "^":
                total += countEvals(left, true, cache) * countEvals(right, false, cache);
                total += countEvals(left, false, cache) * countEvals(right, true, cache);
                break;
        }
    } else {    // desired result is false
        switch (operator) {
            case "&":
                total += countEvals(left, true, cache) * countEvals(right, false, cache);
                total += countEvals(left, false, cache) * countEvals(right, true, cache);
                total += countEvals(left, false, cache) * countEvals(right, false, cache);
                break;
            case "|":
                total += countEvals(left, false, cache) * countEvals(right, false, cache);
                break;
            case "^":
                total += countEvals(left, true, cache) * countEvals(right, true, cache);
                total += countEvals(left, false, cache) * countEvals(right, false, cache);
        }
    }

    return total;
}

function stringToBool(bool) {
    if (bool === "0") {
        return false;
    } else if (bool === "1") {
        return true;
    }
}

function main() {
    let expression = "0&0&0&1^1|0";
    let result = true;

    let ways = booleanEvaluation(expression, result);
    console.log(`booleanExpression(${expression}, ${result}): `, ways);
}

main();
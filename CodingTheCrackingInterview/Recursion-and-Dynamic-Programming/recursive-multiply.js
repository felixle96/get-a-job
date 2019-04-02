/**
 * Multiply two numbers without the "*" 
 * operator. 
 * Time: O(log(smaller num)), space: O(log(smaller num))
 * @param {Number} num1 
 * @param {Number} num2 
 */
function recursiveMultiply(num1, num2) {
    /**
     * Figure out which number is larger and which one 
     * is smaller, so less bitshifting will be required.
     */
    let n1 = num1, n2 = num2;
    if (num1 < num2) {  // swap order so n1 will be larger 
        n1 = num2, n2 = num1;
    }

    /**
     * Recursively multiply num1 and num2 by bitshifting
     * them.
     * @param {Number} num1 
     * @param {Number} num2 
     */
    function recMult(num1, num2) {
        if (num2 === 0) {
            return 0;
        } else if (num2 === 1) {
            return num1;
        }

        /**
         * Determine whether a remainder should be taken out of num2.
         */
        let rem = 0;
        if (isEven(num2) === false) {   // odd, remove remainder before shifting
            rem = num1;
            num2 = num2 - 1;
        }

        /**
         * Compute recursive product by bitshifting and add remainder
         * if not 0.
         */
        let product = recMult(num1 << 1, num2 >> 1);
        return rem === 0 ? product : product + rem;
    }

    return recMult(num1, num2);
}

/**
 * Returns true if number is even, false otw.
 * @param {Number} num 
 */
function isEven(num) {
    return num % 2 === 0;
}

function main() {
    let num1 = 5, num2 = 19;

    console.log(`num1=${num1}, num2=${num2}`);
    console.log('recursiveMultiply(): ', recursiveMultiply(num1, num2));
}

main();
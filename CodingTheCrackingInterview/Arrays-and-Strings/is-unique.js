function isUnique(input) {
    // convert string to arr for easier sort
    let arr = input.split('');
    arr.sort();

    for(let i = 0; i < arr.length - 1; i++) {   // compare all adj values
        if (arr[i] === arr[i+1]) {  // found dupelicate
            return false;   
        }
    }

    return true;
}

function isUnique1(input) {
    // create set so search will be done in O(1)
    let charSet = new Set();

    for(let i = 0; i < input.length; i++) { //
        if (charSet.has(input[i])) {    // found duplicate
            return false;
        }

        charSet.add(input[i]);
    }

    return true;
}

let input = "hello";

console.log(`isUnique(${input}): ${isUnique(input)}`);
console.log(`isUnique1(${input}): ${isUnique1(input)}`);
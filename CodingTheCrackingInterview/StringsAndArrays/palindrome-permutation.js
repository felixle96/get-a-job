function isPalPerm(str) {
    let charList = new Array(256).fill(0);

    // count number of chars
    for(let i = 0; i < str.length; i++) {
        charList[str.charCodeAt(i)] += 1;
    }

    // count number of chars
    let numOdd = 0;
    for (let i = 0; i < charList.length; i++) {
        numOdd = charList[i] % 2 === 0 ? numOdd : numOdd + 1;
    }

    if (str.length % 2 === 0) { // even string requires all char counts to be even
        return numOdd === 0;
    } else {    // odd string requires one char count to be odd
        return numOdd === 1;
    }
}

let str = 'taac';
console.log(`isPalPerm(${str}): ${isPalPerm(str)}`);
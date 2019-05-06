function stringCompression(str) {
    let compressedArr = [];
    let currChar = str[0];
    let currCount = 1;

    for (let i = 1; i < str.length; i++) {
        if (currChar !== str.charAt(i)) {   // chars aren't equal, keep track of new char
            compressedArr.push(currChar + currCount);
            currChar = str.charAt(i);
            currCount = 0;
        }
        currCount++;
    }

    compressedArr.push(currChar + currCount);   // append last set of chars

    let compressedStr = compressedArr.join("");

    return (compressedStr.length < str.length) ? compressedStr : str;
}

let str1 = "aabcccccaaa";
let str2 = 'aaabcderfffghijikl';
let str3 = 'abcdefg';

console.log(`stringCompression(${str1}): ${stringCompression(str1)}`);
console.log(`stringCompression(${str2}): ${stringCompression(str2)}`);
console.log(`stringCompression(${str3}): ${stringCompression(str3)}`);
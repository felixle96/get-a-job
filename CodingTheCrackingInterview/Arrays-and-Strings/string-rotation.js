function stringRotation(str1, str2) {
    if (str1.length !== str2.length) {  // can't be rotation if len not equal
        return false;
    }

    let firstMatch = 0; // index of first location where chars are equal
    while (firstMatch < str1.length) {
        if (str1[firstMatch] === str2[0]) {
            break;
        }

        firstMatch++;
    }

    let frontHalf = str2.slice(0, str1.length - firstMatch);
    let backHalf = str2.slice(str1.length - firstMatch);
    let unrotatedStr = backHalf + frontHalf;
    // console.log(str1.length - firstMatch);
    // console.log('firstMatch: ', firstMatch, ' unrotatedStr: ', unrotatedStr, ' frontHalf: ', frontHalf, ' backHalf: ', backHalf);

    if (str1.includes(unrotatedStr)) {
        return true;
    } else {
        return false;
    }
}

let str1a = 'waterbottle', str2a = 'erbottlewat';
let str1b = 'aaaa', str2b = 'bbbb';
let str1c = 'aabb', str2c = 'bbaa';

console.log(`stringRotation(${str1a}, ${str2a}): ${stringRotation(str1a, str2a)}`);
console.log(`stringRotation(${str1b}, ${str2b}): ${stringRotation(str1b, str2b)}`);
console.log(`stringRotation(${str1c}, ${str2c}): ${stringRotation(str1c, str2c)}`);
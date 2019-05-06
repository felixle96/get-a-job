function isOneAway(s1, s2) {
    if (Math.abs(s1.length - s2.length) > 1) {
        // strings cannot be one away if length of strings aren't within one 
        return false;
    }

    if (s1.length !== s2.length) {  // check for ins/del
        let longerStr = (s1.length > s2.length) ? s1 : s2;
        let shorterStr = (s1.length < s2.length) ? s1 : s2;

        let i = 0, j = 0;
        while(i < longerStr && j < shorterStr) {
            if (longerStr.charAt(i) === shorterStr.charAt(j)) { // chars are equal
                i++, j++;
            } else {
                if (i !== j) {
                    return false;
                }
                i++;
            }
        }
        
    } else {    // check for replacement
        let numDiff = 0;
        for (let i = 0; i < s1.length; i++) {
            if (s1.charAt(i) !== s2.charAt(i)) {
                numDiff += 1;

                if (numDiff > 1)  {
                    return false;
                }
            }
        }
    }

    return true;
}

function isOneAway1(s1, s2) {

    if (Math.abs(s1.length - s2.length) > 1) {
        // strings cannot be one away if length of strings aren't within one 
        return false;
    }

    let longerStr = (s1.length > s2.length) ? s1 : s2;
    let shorterStr = (s1.length < s2.length) ? s1 : s2;

    if (s1.length !== s2.length) {  // only a del/ins may work
        // check if inserting or deleting a char will make strings equal
        for (let i = 0; i < longerStr.length; i++) {
            // result of del/ins a char
            let delStr = longerStr.slice(0, i) + longerStr.slice(i + 1);
            // console.log('delStr: ', delStr, 'shorterStr: ', shorterStr);

            if (delStr === shorterStr) {    // one del/ins edit will make them match
                return true;
            }
        }
    } else {    // str len is equal so a replace may work
        // check if replacing one char will work
        for (let i = 0; i < s1.length; i++) {
            let replStr = s1.slice(0, i) + s2.charAt(i) + s1.slice(i + 1);

            if (replStr === s2) {
                return true;
            }
        }
    }

    return false;
}

let str1_1 = 'pale', str1_2 = 'ple';
let str2_1 = 'pales', str2_2 = 'pale';
let str3_1 = 'pale', str3_2 = 'bale';
let str4_1 = 'pale', str4_2 = 'bake';

let str5_1 = 'pale', str5_2 = 'rawr';
let str6_1 = 'pale', str6_2 = 'bakecake';

console.log(`isOneAway(${str1_1}, ${str1_2}): ${isOneAway(str1_1, str1_2)}`);
console.log(`isOneAway(${str2_1}, ${str2_2}): ${isOneAway(str2_1, str2_2)}`);
console.log(`isOneAway(${str3_1}, ${str3_2}): ${isOneAway(str3_1, str3_2)}`);
console.log(`isOneAway(${str4_1}, ${str4_2}): ${isOneAway(str4_1, str4_2)}`);
console.log(`isOneAway(${str5_1}, ${str5_2}): ${isOneAway(str5_1, str5_2)}`);
console.log(`isOneAway(${str6_1}, ${str6_2}): ${isOneAway(str6_1, str6_2)}`);


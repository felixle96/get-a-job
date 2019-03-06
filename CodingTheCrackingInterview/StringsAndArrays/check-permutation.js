function isPerm(s1, s2) {
    if (s1.length !== s2.length) {  // can't be permutation if length not same
        return false;
    }

    // keep track of char count using array of counts
    let charList1 = new Array(256).fill(0);
    let charList2 = new Array(256).fill(0);

    for (let i = 0; i < s1.length; i++) {   // count all chars
        charList1[s1.charCodeAt(i)] += 1;
        charList2[s2.charCodeAt(i)] += 1;
    }

    // join arrays into strings for easy comparison
    let strChars1 = charList1.join();
    let strChars2 = charList2.join();

    return strChars1 === strChars2;
}

function isPerm1(s1, s2) {
    if (s1.length !== s2.length) {  // can't be permutation if length not same
        return false;
    }

    // keep track of char count using array of counts
    let charList = new Array(256).fill(0);

    for (let i = 0; i < s1.length; i++) {   // count all chars
        charList[s1.charCodeAt(i)] += 1;
    }

    for (let i = 0; i < s2.length; i++) {   // count all chars
        charList[s2.charCodeAt(i)] -= 1;
    }

    // join arrays into strings for easy comparison
    let strChars = charList.join();

    return strChars === Array(256).fill(0).join();
}

let s1 = 'hello there';
let s2 = 'ereht olleh';

console.log(`isPerm(${s1}, ${s2}): ${isPerm(s1, s2)}`);
console.log(`isPerm1(${s1}, ${s2}): ${isPerm1(s1, s2)}`);
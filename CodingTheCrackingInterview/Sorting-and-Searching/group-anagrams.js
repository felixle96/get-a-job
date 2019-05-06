/**
 * Group array of strings into anagrams.
 * @param {Array<String>} strings Array of strings.
 */
function groupAnagrams(strings) {
    let anagrams = new Map();   // key: sorted anagram, val: array of anagrams

    /**
     * Add all strings to anagrams map.
     */
    for (let i = 0; i < strings.length; i++) {
        let sorted = sortString(strings[i]);

        let list = anagrams.get(sorted);
        if (list !== undefined) {   // anagram list exists
            list.push(strings[i]);
        } else {    // create new anagram list entry
            anagrams.set(sorted, [strings[i]]);
        }
    }

    // convert map to array of anagram lists
    let anagramList = [];
    anagrams.forEach((list) => {
        anagramList.push(list);
    });

    return anagramList;
}

/**
 * Takes a string and returns it in sorted form.
 * @param {String} str String to sort.
 */
function sortString(str) {
    let arr = str.split("");
    
    return arr.sort((a, b) => a.charCodeAt() - b.charCodeAt()).join("");
}

function main() {
    let anagrams = ['hello', 'lloeh', 'cat', 'bat', 'tac', 'tab', 'bar', 'rab'];
    console.log('anagrams: \n', anagrams);

    let group = groupAnagrams(anagrams);
    console.log('group: \n', group); 
}

main();
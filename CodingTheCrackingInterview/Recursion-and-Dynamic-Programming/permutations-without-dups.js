function permutationsWithoutDups(str) {
    // convert string to set for quicker finds
    let results = [];
    let set = new Set();
    for (let i = 0; i < str.length; i++) {
        set.add(str[i]);
    }

    function permutations(set, path = []) {
        if (set.size <= 0) {
            // join path array into string and store
            results.push(path.join(""));
        }

        // continue generating permutations
        set.forEach(function(val) {
            // create new set for path that chose a char
            let childSet = new Set(set.keys());
            childSet.delete(val);

            // take path and revert path when done
            path.push(val);
            permutations(childSet, path);
            path.pop();
        });
    }

    permutations(set);
    return results;
}

function main() {
    let inputString = "abcdef";
    let perm = permutationsWithoutDups(inputString);

    console.log('input string: ', inputString);
    console.log('permutationsWithoutDups(): ', perm);
    console.log('length: ', perm.length);
}

main();
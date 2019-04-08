function permutationsWithDups(input) {
    let result = [];

    function perm(input, path=[]) {
        if (input === "") { 
            // formed a compute permutation, store it;
            result.push(path.join(""));
        }

        // continue adding chars to form permutation
        let seen = new Set(); // keep track of paths so don't repeat them
        for (let i = 0; i < input.length; i++) {    // try a char for permutations
            let currChar = input[i];
            if (!seen.has(currChar)) {  // haven't done char yet, try it
                // set up new perm call
                seen.add(currChar);
                let str = input.substr(0, i) + input.substr(i + 1);
                path.push(currChar);

                // find perms from this char, and revert when done
                perm(str, path);
                path.pop();
            }
        }
    }

    perm(input);
    return result;
}

function main() {
    let input = "aaabbc";
    let perm = permutationsWithDups(input);

    console.log('input: ', input);
    console.log('permutationsWithDups(): ', perm, ' , count: ', perm.length);
}

main();
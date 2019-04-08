function parens(n, open = 0, closed = 0, path = []) {
    if (open === n && closed === n) {   // finished valid combo of parens
        // print it
        console.log('parens(): ', path.join(""));
        return;
    }

    // add parens to our path
    if (open < n) { // can still add open parens
        // try open path
        path.push('(');
        parens(n, open + 1, closed, path);
        path.pop();

        if (open > closed) {    // can add open or closed
            // already did open, so try closed only
            path.push(')');
            parens(n, open, closed + 1, path);
            path.pop();
        }
    } else {    // must add closed parens
        path.push(')');
        parens(n, open, closed + 1, path);
        path.pop();
    }
}

function main() {
    let n = 6;

    console.log(`parens(n=${3}): ${parens(n)}`);
}

main();


function coins(n) {
    let change = [25, 10, 5, 1];
    let result = 0;

    function createAmount(n, curr = 0, largest = 100) {
        // console.log(`n=${n}, curr=${curr}, largest=${largest}`)
        if (curr === n) {   // created correct amount
            result++;
            return;
        } else if (curr > n) {
            return;
        }

        // continue adding to current amount
        change.forEach((coin) => {
            if (coin === 1 && largest === 1) {
                result++;
                return;
            } else if (coin <= largest && curr + coin <= n) {
                createAmount(n, curr + coin, coin);
            }
        });

        return;
    }

    createAmount(n);
    return result;
}

function coins1(n) {
    let values = [25, 10, 5, 1];
    let result = 0;

    function createAmount(curr, coin = 0) {
        if (curr === 0) {   // created amount/reduced
            result++;
            return;
        } else if (curr < 0 || coin >= values.length) {
            return;
        }

        let i = 0;

        if (values[coin] === 1) {   // just fill with pennies;
            result++;
            return;
        }
        do {
            createAmount(curr - values[coin] * i, coin + 1);
            i++;
        } while (curr - values[coin] * i >= 0);

    }

    createAmount(n);
    return result;
}

function coins2(n) {
    let values = [25, 10, 5, 1];
    result = 0;
    cache = new Map();

    function createAmount(curr, coin = 0) {
        let entry = cache.get(curr);
        if (entry !== undefined && entry[coin] !== undefined) {   // value computed already
            return entry[coin];
        }

        if (coin >= values.length - 1) {    // reached last denom
            return 1;
        }

        // compute number of ways
        let ways = 0, i = 0;
        do {
            ways += createAmount(curr - values[coin] * i, coin + 1);
            i++;
        } while(curr - values[coin] * i >= 0);

        // store computed value;
        if (entry === undefined) {
            let newEntry = Array(4).fill(undefined);
            newEntry[coin] = ways;
            cache.set(curr, newEntry);
        } else {
            entry[coin] = ways;
        }

        return ways;
    }

    let ways = createAmount(n);
    console.log('cache: ');
    console.log(cache);
    return ways;
}

function main() {
    let n = 29;    

    console.log('n: ', n);
    console.log('coins2(): ', coins2(n));
    console.log('coins1(): ', coins1(n));
    console.log('coins(): ', coins(n));
}

main();
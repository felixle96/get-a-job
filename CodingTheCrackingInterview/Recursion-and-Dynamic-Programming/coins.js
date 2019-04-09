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

function main() {
    let n = 11143;    

    console.log('n: ', n);
    console.log('coins(): ', coins(n));
    console.log('coins1(): ', coins1(n));
}

main();
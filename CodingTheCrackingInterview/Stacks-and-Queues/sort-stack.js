class Stack {
    constructor() {
        this.arr = [];
    }

    push(val) {
        this.arr.push(val);
    }

    pop() {
        if (this.arr.length === 0) {
            return false;
        } else {
            return this.arr.pop();
        }
    }

    peek() {
        if (this.arr.length === 0) {
            return false;
        } else {
            return this.arr[this.arr.length - 1];
        }
    }

    isEmpty() {
        return this.arr.length === 0;
    }

    size() {
        return this.arr.length;
    }
}

function sortStack(stack) {
    let tempStack = new Stack();

    while (!stack.isEmpty()) {   // while stack is not emptied
        let curr = stack.pop(); // remove top value
        if (tempStack.isEmpty() || curr >= tempStack.peek()) {   
            /**
             * Push onto temp stack as long as in least to greatest order, 
             * b/c order will be swapped to greatest to least when taken off,
             * which when pushed back onto original stack will be swapped
             * back to least to greatest order.
             */
            tempStack.push(curr);
        } else {
            // swap from tempStack back to original stack
            while (!tempStack.isEmpty()) {
                if (tempStack.peek() > curr) {   // move top item from tempStack back to stack
                    stack.push(tempStack.pop());
                } else { // move current popped value back to original stack
                    stack.push(curr);
                    curr = Number.NEGATIVE_INFINITY;
                }
            }
            if (curr !== Number.NEGATIVE_INFINITY) { // haven't put curr back on yet
                stack.push(curr);
            }
        }
    }

    while (!tempStack.isEmpty()) {  // transfer from tempStack (L -> S) back to stack (S -> L)
        stack.push(tempStack.pop());
    }

    return stack;
}

function rand(max) {
    return Math.floor(Math.random() * max) + 1;
}

function main() {
    let stack = new Stack();
    let max = 20;

    for (let i = 0; i < 16; i++) {
        stack.push(rand(max));
    }

    console.log('stack: ', stack);
    console.log('sortStack(): ', sortStack(stack));
}

main()
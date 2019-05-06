class MinStack {
    constructor() {
        this.arr = [];
        this.minNum = Number.POSITIVE_INFINITY;
    }

    push(val) {
        console.log('MinStack.push(): ', val);
        this.minNum = Math.min(this.minNum, val);
        this.arr.push(new Node(val, this.minNum));
        return true;
    }

    pop() {
        if (this.arr.len === 0) {
            return false;
        } else {
            return this.arr.pop();
        }
    }

    peek() {
        if (this.arr.length === 0) {
            return false;
        } else {
            let topNode = this.arr[this.arr.length - 1];
            return topNode;
        }
    }

    min() {
        let topNode = this.peek();

        if (topNode) {
            return topNode.min;
        } else {
            return false;
        }
    }
}

class Node {
    constructor(val, min) {
        this.val = val;
        this.min = min;
    }
}

function rand (max) {
    let ran = Math.floor(Math.random() * max);
    console.log('rand: ', ran);
    return ran;
}

function main() {
    let stack = new MinStack();
    let max = 12;

    for (let i = 0; i < 15; i++) {
        let num = rand(max);
        console.log(`stack.push(${num}): ${stack.push(num)}`);
        console.log(`stack.peek(): `, stack.peek());
        console.log(`stack.min(): `, stack.min());
    }

    console.log('stack: ', stack.arr);

    for (let i = 0; i < 18; i++) {
        console.log(`stack.peek(): ${stack.peek()}`);
        console.log(`stack.pop(): `, stack.pop());
        console.log(`stack.min(): `, stack.min());
    }
}

main();
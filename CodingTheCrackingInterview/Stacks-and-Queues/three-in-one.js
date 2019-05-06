class ThreeInOne {
    constructor(len) {
        // compute stack lengths
        let len1 = Math.floor(len / 3);
        let len2 = Math.floor((len - len1) / 2);
        let len3 = len - len2 - len1;

        // create array and three stacks
        this.stack = new Array(len);
        this.stack1 = new Stack(this.stack, 0, len1);
        this.stack2 = new Stack(this.stack, len1, len2);
        this.stack3 = new Stack(this.stack, len1 + len2, len3);
    }
}

class Stack {
    constructor(arr, top, maxLen) {
        this.arr = arr;
        this.top = top;
        this.maxLen = maxLen;
        this.len = 0;
    }

    push(val) {
        if (this.len === this.maxLen) {  // stack is full
            return false;
        } else { // insert item into top of stack
            this.arr[this.top++] = val;
            this.len = this.len + 1;
            return true;
        }
    }

    pop() {
        if (this.len === 0) {    // stack is empty
            return false;
        } else {    // pop from top of stack
            let val = this.arr[--this.top];
            this.arr[this.top] = undefined;
            this.len = this.len - 1;

            return val;
        }
    }

    peek() {
        if (this.len === 0) {
            return false;
        } else {
            return this.arr[this.top - 1];
        }
    }
}

function main() {
    let stack = new ThreeInOne(14);
    let stacks = ['stack1', 'stack2', 'stack3'];
    let stackNum = -1;
    for (let i = 0; i < 18; i++) {
    
        if (i % 6 === 0) {
            stackNum++;
        }

        console.log(`stack${stackNum + 1}.push(${i * 3}): ${stack[stacks[stackNum]].push(i * 3)}`);
        console.log(`stack${stackNum + 1}.peek(): ${stack[stacks[stackNum]].peek()}`);
    }

    console.log('mystack: ', stack.stack);
    stackNum = -1;
    for (let i = 0; i < 18; i++) {
    
        if (i % 6 === 0) {
            stackNum++;
        }
        console.log(`stack${stackNum + 1}.peek(): ${stack[stacks[stackNum]].peek()}`);
        console.log(`stack${stackNum + 1}.pop(): ${stack[stacks[stackNum]].pop()}`);
    }
}

main();
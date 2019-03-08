class StackOfPlates {
    constructor(stackSize) {
        this.stack = [new stack()];
        this.stackIndex = 0;
        this.stackSize = stackSize;
    }

    push(val) {
        let currStack = this.stack[this.stackIndex];

        if (currStack.size() < this.stackSize) {    
            // room in current stack
            currStack.push(val);
        } else {
            // no room in current stack, create new one
            let newStack = new stack();
            newStack.push(val);
            this.stack.push(newStack);
            this.stackIndex = this.stackIndex + 1;
        }
    }

    pop() {
        let currStack = this.stack[this.stackIndex];

        // look for non empty stack
        while(currStack.size() === 0 && this.stackIndex !== 0) {
            // pop current empty stack as long as not first stack
            this.stack.pop();
            this.stackIndex = this.stackIndex - 1;
            currStack = this.stack[this.stackIndex];
        }

        if (currStack.size() === 0 && this.stackIndex === 0) {
            // entire stack is empty
            return false;
        }

        // call pop method of non empty stack
        return currStack.pop();
    }

    popAt(index) {
        let stack;
        if (index < 0 || index > this.stackIndex) { // index is out of bounds
            return false;
        } else {    // stack exists
            stack = this.stack[index];
        }

        if (stack.size() === 0) {
            return false;
        } else {
            return stack.pop();
        }
    }
}

class stack {
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

    size() {
        return this.arr.length;
    }
}

function main() {
    let plates = new StackOfPlates(4);
    let poppedPlates = [];

    for (let i = 0; i < 25; i++) {
        plates.push(i);
    }
    console.log('plates: ', plates.stack);

    console.log('poppedAt: ', plates.popAt(3));
    console.log('plates: ', plates.stack);
    console.log('poppedAt: ', plates.popAt(0));
    console.log('plates: ', plates.stack);
    console.log('poppedAt: ', plates.popAt(5));
    console.log('plates: ', plates.stack);
    console.log('poppedAt: ', plates.popAt(5));
    console.log('plates: ', plates.stack);
    console.log('poppedAt: ', plates.popAt(5));
    console.log('plates: ', plates.stack);
    console.log('poppedAt: ', plates.popAt(5));
    console.log('plates: ', plates.stack);
    console.log('poppedAt: ', plates.popAt(5));
    console.log('plates: ', plates.stack);


    for (let i = 0; i < 25; i++) {
        poppedPlates.push(plates.pop());
    }

    console.log('poppedPlates: ', poppedPlates);
    console.log('plates: ', plates.stack);
}

main();
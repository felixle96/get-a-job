class QueueViaStacks {
    constructor() {
        this.stack1 = new Stack();
        this.stack2 = new Stack();
        this.stack1Active = true;
    }

    enqueue(val) {
        if (this.stack1Active) {    
            this.stack1.push(val);
        } else {    // need to transfer contents back before pushing
            this.transferStack(this.stack2, this.stack1);
            this.stack1Active = true;
            this.stack1.push(val);
        }
    }

    dequeue() {
        if (this.stack1Active) {
            // transfer stacks to setup for removing first element
            this.transferStack(this.stack1, this.stack2);
            this.stack1Active = false;
        } 

        return this.stack2.pop();
    }

    peek() {
        if (this.stack1Active) {
            // transfer stacks to setup for removing first element
            this.transferStack(this.stack1, this.stack2);
            this.stack1Active = false;
        } 

        return this.stack2.peek();
    }

    /**
     * Transfers all contents from one stack to another
     * @param {*} fullStack Source stack
     * @param {*} emptyStack Dest stack
     */
    transferStack(fullStack, emptyStack) {
        for (let val = fullStack.pop(); val || val === 0; val = fullStack.pop()) {
            emptyStack.push(val);
        }

        // console.log('fullStack: ', fullStack, 'emptyStack: ', emptyStack);
    }
}

class Stack {
    constructor() {
        this.stack = [];
    }

    push(val) {
        this.stack.push(val);
    }

    pop() {
        if (this.stack.length === 0) {
            return false;
        } else {
            return this.stack.pop();
        }
    }

    peek() {
        if (this.stack.length === 0) {
            return false;
        } else {
            return this.stack[this.stack.length - 1];
        }
    }
}

function main() {
    let queue = new QueueViaStacks();

    for (let i = 0; i < 14; i++) {
        console.log('i: ', i);
        queue.enqueue(i);
        // console.log('front: ', queue.peek());
    }

    console.log('queue: ', queue);

    for (let i = 0; i < 16; i++) {
        console.log('front: ', queue.dequeue());
    }
}

main();
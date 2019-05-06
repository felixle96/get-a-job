class LinkedList {
    constructor(len, arr) {
        this.len = len;
        this.head = null;
        this.arr = arr;
        this.constructTree();
    }

    createNode(i) {
        if (this.arr) {
            return { next: null, val: this.arr[i]};    
        }

        return { next: null, val: this.rand() };
    }

    constructTree() {
        if (this.len === 0) {
            return;
        }

        this.head = this.createNode(0);
        let curr = this.head;
        for (let i = 1; i < this.len; i++) {
            let newNode = this.createNode(i);
            curr.next = newNode;
            curr = curr.next;
        }
    }

    rand() {
        return Math.floor(Math.random() * this.len);
    }
}

function loopDetection(head) {
    let slow = head, fast = head;
    let collision = null;

    while (collision === null) { // find where slow and fast collide to detect loop
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) {    // found collision, we have a loop
            collision = slow;
        }
    }

    // now find start of loop
    while (collision !== head) {
        collision = collision.next;
        head = head.next;
    }

    return collision;
}

function print(head) {
    console.log('LinkedList::print():');
    let curr = head;
    while (curr) {
        console.log('curr: ', curr.val);
        curr = curr.next;
    }
}

function main() {
    let list1 = new LinkedList(8, [1,2,3,4,5,6,7,8]);
    let curr1 = list1.head;
    // let cycle = list1.head;
    let cycle = list1.head.next.next.next.next;

    while(curr1.next) { // find end of list to set cycle
        curr1 = curr1.next;
    }

    curr1.next = cycle;


    let startOfLoop = loopDetection(list1.head);
    console.log(`loopDetection(): `, startOfLoop);
}

main();
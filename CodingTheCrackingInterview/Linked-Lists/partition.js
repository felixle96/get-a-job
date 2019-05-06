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

    print() {
        console.log('LinkedList::print():');
        let curr = this.head;
        while (curr) {
            console.log('curr: ', curr.val);
            curr = curr.next;
        }
    }
}

function deleteMiddleNode(middle) {
    if (!middle || !middle.next) {
        return;
    }

    let temp = middle.next;

    // copy contents over from next adjacent node and delete it
    middle.val = temp.val;
    middle.next = temp.next;

    return;
}

function moveNodeToLeft(head, curr) {
    // make deep copy of node
    let copy = {
        val: curr.val,
        next: head.next
    }

    // delete node and insert copy after head
    deleteMiddleNode(curr);
    head.next = copy;
}

function partition(head, x) {
    if (!head || !head.next) {  // nothing to do here 
        return;
    }

    /**
     * Move all nodes < x to left partition
     */
    let curr = head.next;
    let prev = head;
    while (curr.next.next) {    // stop node right before last node
        if (curr.val < x) { // need to move node to left partition
            moveNodeToLeft(head, curr);
            // curr is now the next node, so need to move curr to next node
        } else {    // node belongs in right partition so do nothing
            prev = curr;
            curr = curr.next;
        }
    }

    if (curr.val < x) { 
        // need to move 2nd to last node to left, 
        // but need to keep track of 2nd to left node position
        moveNodeToLeft(head, curr);
        curr = prev;
    }

    // curr is 2nd to last node

    if (curr.next.val < x) {    // move last node to left partition
        moveNodeToLeft(head, curr.next);
    } else {
        curr = curr.next;
    }

    // curr is now last node

    if (head.val >= x) {    // move head to right partition
        // insert head at end
        curr.next = {
            val: head.val,
            next: null
        }

        // remove head from front
        deleteMiddleNode(head);
    }
}

function main() {
    let list = new LinkedList(10, [8,4,5,6,3,2,7,8,1,3]);
    let x = 6;
    list.print();

    console.log(`partition(${x}): ${partition(list.head, x)}`);
    list.print();
}

main();
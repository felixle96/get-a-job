class LinkedList {
    constructor(len) {
        this.len = len;
        this.head = null;
        this.constructTree();
    }

    createNode() {
        return { next: null, val: this.rand() };
    }

    constructTree() {
        if (this.len === 0) {
            return;
        }

        this.head = this.createNode();
        let curr = this.head;
        for (let i = 1; i < this.len; i++) {
            let newNode = this.createNode();
            curr.next = newNode;
            curr = curr.next;
        }
    }

    rand() {
        return Math.floor(Math.random() * this.len / 3);
    }

    print() {
        console.log('LinkedList::print():');
        let curr = this.head;
        while (curr) {
            console.log('curr: ', curr);
            curr = curr.next;
        }
    }
}

// Time: O(n), space: O(n)
function removeDups1(head) {
    let curr = head.next, prev = head;
    let set = new Set();
    set.add(head.val);

    while (curr) {   // add all values to set
        let currVal = curr.val;
        if (set.has(currVal)) {    // found dupe delete it
            prev.next = curr.next;
            curr = prev;
        }

        // update duplicates
        set.add(currVal);
        prev = curr;
        curr = curr.next;
    }

    return head;
}

// Time: O(n^2), space: O(1)
function removeDups(head, len) {
    let firstOccurence = head;
    let prev = head;
    let curr = head.next;

    if (len === 1) {
        return;
    }

    while (curr) {
        if (firstOccurence.val === curr.val) {    // found a duplicate
            // remove duplicate
            prev.next = curr.next;
            curr = prev;
        }

        // haven't looked at every duplicate so update current potential duplicate
        if (curr.next === null && firstOccurence.next !== null) {
            firstOccurence = firstOccurence.next;
            prev = curr = firstOccurence;
        }
        prev = curr;
        curr = curr.next;
    }

    return head;
}


function main() {
    let list = new LinkedList(14);
    list.print();

    console.log('removeDups(): ');
    removeDups(list.head);
    list.print();

    let list1 = new LinkedList(14);
    list1.print();

    console.log('removeDups1(): ');
    removeDups(list1.head, list1.len);
    list1.print();
}

main();
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
        return Math.floor(Math.random() * this.len);
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

var target = null;

function returnKthToLast(head, k) {
    if (head === null) {
        return 0;
    } else {
        let level = 1 + returnKthToLast(head.next, k);

        if (level === k) {
            target = head;
        }

        return level;
    }
}

function main() {
    let list = new LinkedList(14);
    let k = 6;
    list.print();

    console.log(`returnKthToLast(k=${k}): ${returnKthToLast(list.head, k)}, target: `, target);
}

main();
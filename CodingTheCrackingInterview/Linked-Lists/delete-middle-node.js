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

function main() {
    let list = new LinkedList(7);
    list.print();
    console.log('deleteNode: ', list.head.next.next);

    console.log(`deleteMiddleNode(): ${deleteMiddleNode(list.head.next.next)}`);
    list.print();
}

main();
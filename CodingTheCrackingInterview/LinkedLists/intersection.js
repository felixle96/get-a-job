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

function findLen(head) {
    let len = 0;
    for (let curr = head; curr; curr = curr.next) {
        len++;
    }

    return len;
}

function makeSameLen(head, len1, len2) {
    let curr = head;

    while (len1 > len2) {
        curr = curr.next;
        len1--;
    }

    return curr;
}

function intersection(list1, list2) {
    let len1 = findLen(list1), len2 = findLen(list2);    // get len of lists
    let curr1 = list1, curr2 = list2;

    if(len1 > len2) {   // move head of list1 to same position (count wise) as list2
        curr1 = makeSameLen(curr1, len1, len2);
    } else if (len1 < len2) {
        curr2 = makeSameLen(curr2, len2, len1);
    }

    // at this point both heads of lists are pointing at same point
    while (curr1 !== curr2) {   // keep searching until nodes are equal either at intersection or at null
        curr1 = curr1.next;
        curr2 = curr2.next;
    }

    return curr1 === null ? false : curr1;
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
    // let list2 = new LinkedList(2, [9,10]);
    let list2 = new LinkedList(8, [1,5,2,4,5,6,1,1]);

    // list2.head.next.next = list1.head.next.next;
    
    console.log('list1: ');
    print(list1.head);
    console.log('list2: ');
    print(list2.head);

    let inter = intersection(list1.head, list2.head);
    console.log(`intersection(): `, inter);
}

main();
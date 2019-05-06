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
        return Math.floor(Math.random() * 10);
    }
}

function reverseSum(list1, list2) {
    let sum = { val: 0, next: null };
    let currSum = sum, curr1 = list1, curr2 = list2;
    let carry = 0;

    while (curr1 || curr2) {    // continue until done with all digits
        let val1, val2;

        /**
         * Get all values for current nodes
         */
        if (curr1) { // node exists, get its value
            val1 = curr1.val;
            curr1 = curr1.next;
        } else {
            val1 = 0;
        }

        if (curr2) {
            val2 = curr2.val;
            curr2 = curr2.next;
        } else {
            val2 = 0;
        }

        // compute sum of current digits;
        currSum.val = val1 + val2 + carry;

        // update carry and sum if necessary
        carry = Math.floor(currSum.val / 10);
        currSum.val = currSum.val - (carry * 10);

        if (curr1 || curr2) {   // create another sum node
            currSum.next = { val: 0, next: null };
            currSum = currSum.next;
        }
    }

    if (carry) {    // need one last sum node
        currSum.next = { val: carry, next: null };
    }

    return sum;
}

function print(head) {
    console.log('LinkedList::print():');
    let curr = head;
    while (curr) {
        console.log('curr: ', curr.val);
        curr = curr.next;
    }
}

function forwardSum(list1, list2) {
    let sumList = { val: 0, next: null };
    let len1 = 0, len2 = 0;

    for(let curr1 = list1, curr2 = list2; curr1 || curr2; curr1 = curr1 ? curr1.next : null, curr2 = curr2 ? curr2.next : null) {
        if (curr1) {
            len1++;
        }

        if (curr2) {
            len2++;
        }
    }

    if (len1 < len2) {  // add in zero nodes
        while (len1 < len2) {
            let temp = {val: 0, next: list1};
            list1 = temp;
            len1++;
        }
    } else if (len1 > len2) {
        while (len2 < len1) {
            let temp = {val: 0, next: list2};
            list2 = temp;
            len2++;
        }
    }

    // console.log('list1: ', print(list1));
    // console.log('list2: ', print(list2));

    let carry = recSum(list1, list2, sumList);

    if (carry) {    // check last carry
        let head = { val: carry, next: sumList };
        return head;
    }

    return sumList;
}

function recSum(list1, list2, sumList) {
    if (!list1 && !list2) { // both nodes are invalid return carry
        return 0;
    }

    // compute sum
    let next1 = list1 ? list1.next : null;
    let next2 = list2 ? list2.next : null;
    let sum, carry;

    sumList.next = (!next1 && !next2) ? null : { val: 0, next: null };
    carry = recSum(next1, next2, sumList.next);

    let val1, val2; // get values

    if (list1) {
        val1 = list1.val;
    } else {
        val1 = 0;
    }

    if (list2) {
        val2 = list2.val;
    } else {
        val2 = 0;
    }
    sum = val1 + val2 + carry;
    carry = Math.floor(sum / 10);
    sum = sum - (carry * 10);
    sumList.val = sum;
    return carry;

}

function main() {
    let list1 = new LinkedList(5);
    let list2 = new LinkedList(5);

    console.log(`reverseSum(${print(list1.head)}, ${print(list2.head)}): ${print(reverseSum(list1.head, list2.head))}`)
    console.log(`forwardSum(${print(list1.head)}, ${print(list2.head)}): ${print(forwardSum(list1.head, list2.head))}`)
}

main();
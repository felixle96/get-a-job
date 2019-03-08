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

function palindrome(list) {

    /**
     * 
     * @param {*} head  Head of list 
     * @param {*} back Iterates through list
     * Once recPal starts returning, back will iterate through the list
     * backwards, while front iterates through it forwards
     */
    function recPal(head, back) {
        if (!back) {    // reached end of list
            return head;    // return head of list
        } else {    // keep searching towards back of list
            let front = recPal(head, back.next);
            
            if (front !== false && front.val === back.val) {
                // char matches so keep searching
                return front.next;
            } else {
                // char doesn't match just return false
                return false;
            }
        }
    }

    let result = recPal(list, list);

    return result === false ? false : true;
}


function main() {
    let list = new LinkedList(8, [1,2,3,5,4,3,2,1]);
    list.print();

    console.log(`palindrome(): ${palindrome(list.head)}`);
}

main();
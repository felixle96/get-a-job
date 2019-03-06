class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
        this.height = 0;
        this.balance = 0;
    }
}

class Tree {
    constructor(val) {
        this.root = new Node(val);
    }

    insert(val) {
        this.recInsert(this.root, val);
    }

    recInsert(curr, val) {
        if (curr === null) {    // reached end of tree
            return;
        } else {
            if (val < curr.val) {   // insert into left subtree
                if (curr.left) {    // continue searching left subtree
                    this.recInsert(curr.left, val);
                } else {    // found insert location
                    curr.left = new Node(val);
                }
            } else {    // insert into right subtree
                if (curr.right) {   // continue searching right subtree
                    this.recInsert(curr.right, val);
                } else {    // found insert location
                    curr.right = new Node(val);
                }
            }
        }

        // keep height updated
        let leftHeight = curr.left === null ? -1 : curr.left.height;
        let rightHeight = curr.right === null ? -1 : curr.right.height;
        curr.height = Math.max(leftHeight, rightHeight) + 1;
        curr.balance = rightHeight - leftHeight;

        this.balance(curr);
    }

    rotateLeft(curr) {
        let leftChild = curr.left;
        let right
    }

    rotateRight(curr) {
        
    }

    balance(curr) {
        if (this.balance <= 1 && this.balance >= -1) {  // already balanced
            return;
        }
    
        /**
         * Balance tree depending on needed rotations
         */
        if (this.balance > 1) { // right heavy
            if (curr.right.balance > 0) {   // right right
                // left rotation
            } else {    // right left
                // right left rotation
            }
        } else {    // left heavy
            if (curr.left.balance < 0) {    // left left
                // right rotation
            } else {    // left right
                // left right rotation
            }
        }

    }

    print() {
        function recPrint(curr) {
            if (curr === null) {
                return;
            } else {
                recPrint(curr.left);
                console.log("val: ", curr.val, " height: ", curr.height, " balance: ", curr.balance);
                recPrint(curr.right);
            }
        } 

        recPrint(this.root);
    }

}

function main() {
    let tree = new Tree(12);

    tree.insert(5);
    tree.insert(8);
    tree.insert(3);
    tree.insert(1);
    tree.insert(15);
    tree.insert(19);
    tree.insert(22);
    tree.insert(9);

    tree.print();
}

main();
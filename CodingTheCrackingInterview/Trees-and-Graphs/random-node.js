class Node {
    constructor(val) {
        this.val = val;
        this.left = this.right = null;
        this.leftCount = this.rightCount = 0;
    }

    insertLeft() {
        this.leftCount = this.leftCount + 1;
    }

    insertRight() {
        this.rightCount = this.rightCount + 1;
    }

    removeLeft() {
        this.leftCount = this.leftCount - 1;
    }

    removeRight() {
        this.rightCount = this.rightCount - 1;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    print() {
        if (this.root === null) {
            return;
        }

        let queue = [];
        queue.push(this.root);

        while (queue.length > 0) {
            let curr = queue.shift();

            console.log('val: ', curr.val, ' , leftCount: ', curr.leftCount, ' , rightCount: ', curr.rightCount);

            if (curr.left) {
                queue.push(curr.left);
            }

            if (curr.right) {
                queue.push(curr.right);
            }
        }
    }

    insert(val) {
        if (this.root === null) {   // tree is empty
            // insert value at root
            this.root = new Node(val);
        } else {    // search for correct place to put value
            recInsert(this.root, val);
        }

        function recInsert(root, val) {
            if (root === null) {    // should never get here
                return false;
            } else {
                if (val <= root.val) {  // insert into left subtree
                    if (root.left === null) {   // insert as root of left subtree
                        root.left = new Node(val);
                        root.insertLeft();
                    } else {    // insert into left subtree
                        root.insertLeft();
                        return recInsert(root.left, val);
                    }
                } else {    // insert into right subtree
                    if (root.right === null) {  // insert as root of right subtree
                        root.right = new Node(val);
                        root.insertRight();

                    } else {    // insert into right subtree
                        root.insertRight();
                        return recInsert(root.right, val);
                    }
                }
            }
        }

    }

    removeLeftMostChild(curr, parent = null) {
        if (curr === null) {    // reached end of tree
            return null;
        } else {    // continue searching tree
            while (curr.left !== null) {
                
                if (parent) {
                    if (parent.left === curr) {
                        parent.removeLeft();
                    } else {
                        parent.removeRight();
                    }
                }
                parent = curr;
                curr = curr.left;
            }

            if (parent) {
                if (parent.left === curr) {
                    parent.removeLeft();
                } else {
                    parent.removeRight();
                }
            }

            if (parent && parent.left === curr) {  // delete yourself if you are left child of parent
                parent.left = null;
            } else if (parent) {    
                parent.right = null;
            }
            return curr;
        }
    }

    delete(val) {
        recDelete = recDelete.bind(this);
        removeNode = removeNode.bind(this);
        if (this.root === null) {    // tree empty
            return null;
        } else if (this.root.val === val) { // delete root node
            if (this.root.right === null) { // right tree empty, then left tree is root
                this.root = this.root.left;
            } else {    // otherwise, left most node of right tree is root
                let leftMost = this.removeLeftMostChild(this.root.right, this.root);
                leftMost.left = this.root.left;
                leftMost.leftCount = this.root.leftCount;
                leftMost.rightCount = this.root.rightCount;
                leftMost.right = this.root.right;
                this.root = leftMost;
            }
        } else { // try to delete val
            return recDelete(this.root, val);
        }

        function recDelete(curr, val, parent = null) {
            if (curr === null) {    // reached end of tree
                return false;
            } else {    // keep searching for node to delete
                if (curr.val === val) { // found node, tell parent to delete it
                    removeNode(curr, parent);
                    return true;
                } else if (val <= curr.val) {
                    let result = recDelete(curr.left, val, curr);
                    if (result === true) {
                        curr.removeLeft();
                    }
                    return result;
                } else {
                    let result = recDelete(curr.right, val, curr);
                    if (result === true) {
                        curr.removeRight();
                    }
                    return result;
                }
            }
        }

        function removeNode(del, parent) {
            if (del.left === null && del.right === null) {  // node is leaf, just remove it
                if (parent.left === del) {  // node is left child of parent
                    parent.left = null;
                } else {    // node is right child of parent
                    parent.right = null;
                }
            } else if (del.left !== null && del.right !== null) {   // node has two children, complicated
                let successor = this.removeLeftMostChild(del.right, del);
                successor.left = del.left;
                successor.leftCount = del.leftCount;
                successor.rightCount = del.rightCount;
                successor.right = del.right;
                
                if (parent && parent.left === del) {
                    parent.left = successor;
                } else if (parent && parent.right === del) {
                    parent.right = successor;
                }
            } else if (del.left !== null) { // node only has left child
                if (parent.left === del) {  // node is left child of parent
                    parent.left = del.left;
                } else {    // node is right child of parent
                    parent.right = del.left;
                }
            } else {    // node only has right child
                if (parent.left === del) {  // node is left child of parent
                    parent.left = del.right;
                } else {    // node is right child of parent
                    parent.right = del.right;
                }
            }
        }
    }

    find(val) {

        function recFind(root, val) {
            if (!root) {    // reached end of tree
                return null;
            } else {    // keep searching for val
                if (val === root.val) {
                    return root;
                } else if (val <= root.val) {  // search left subtree
                    return recFind(root.left, val);
                } else {    // search right subtree
                    return recFind(root.right, val);
                }
            }
        }

        return recFind(this.root, val);
    }

    /**
 * Compute probabilities for choosing self, left subtree, and right subtree
 * and choose based of those probabilities
 * @param {Number} leftCount Number of nodes in left subtree
 * @param {Number} rightCount Number of nodes in right subtree
 */
    weightedRandom(leftCount, rightCount) {
        let total = leftCount + rightCount + 1; // one represents self node
        let randNum = Math.floor(Math.random() * total);

        if (randNum === 0) {    // choose self
            return "self";
        } else if (randNum <= leftCount) {  // choose left subtree
            return "left";
        } else {    // choose right subtree
            return "right";
        }
    }

    getRandom() {
        function randomNode(curr) {
            if (!curr) {    // no nodes in tree
                return null;
            } else if (curr.leftCount === 0 && curr.rightCount === 0) { // we are last node in tree
                // don't compute probability, just return yourself
                return curr;
            } else {
                // choose which tree to explore based off number of nodes in subtrees

                let choice = this.weightedRandom(curr.leftCount, curr.rightCount);

                if (choice === "self") {    // choose self
                    return curr;
                } else if (choice === "left") { // choose left subtree
                    return randomNode(curr.left);
                } else {    // choose right subtree
                    return randomNode(curr.right);
                }
            }
        }

        randomNode = randomNode.bind(this);
        return randomNode(this.root);
    }


}





function main() {
    let arr = [10, 5, 15, 3, 7, 12, 18, 1, 4, 6, 8, 11, 14, 17, 20];
    let bst = new BST();

    /**
     * Insert and verify bst
     */
    arr.forEach(val => {
        bst.insert(val);
    });
    bst.print();

    // arr.forEach((val) => {
    //     console.log(`find(${val}): `, bst.find(val));
    // });


    console.log(`delete(${5}): `, bst.delete(5));
    console.log(`delete(${7}): `, bst.delete(7));
    console.log(`delete(${8}): `, bst.delete(8));
    console.log(`delete(${18}): `, bst.delete(18));
    console.log(`delete(${10}): `, bst.delete(10));


    bst.print();

    for (let i = 0; i < 20; i++) {
        console.log('randomNode(): ', bst.getRandom().val)
    }
}

main();

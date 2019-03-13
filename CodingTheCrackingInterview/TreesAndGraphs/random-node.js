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
                    } else {    // insert into left subtree
                        root.insertLeft();
                        return recInsert(root.left, val);
                    }
                } else {    // insert into right subtree
                    if (root.right === null) {  // insert as root of right subtree
                        root.right = new Node(val);
                    } else {    // insert into right subtree
                        root.insertRight();
                        return recInsert(root.right, val);
                    }
                }
            }
        }

    }

    removeLeftMostChild(curr, parent) {
        if (curr === null) {    // reached end of tree
            return null;
        } else {    // continue searching tree
            while (curr.left !== null) {
                if (parent) {
                    parent.removeLeft();
                }
                parent = curr;
                curr = curr.left;
            }

            if (parent && parent.left === curr)  {  // delete yourself if you are left child of parent
                parent.left = null;
            }  
            return curr;
        }
    }

    delete(val) {
        if (root === null) {    // tree empty
            return null;
        } else { // try to delete val

        }

        function recDelete(curr, val, parent = null) {
            if (curr === null) {    // reached end of tree
                return false;
            } else {    // keep searching for node to delete
                if (curr.val === val) { // found node, tell parent to delete it
                    removeNode(curr, parent);
                } else if (val <= curr.val) {
                    recDelete(curr.left, val, curr);
                } else {
                    recDelete(curr.right, val, parent);
                }
            }
        }

        function removeNode(del, parent) {
            if (del.left === null && del.right === null) {  // node is leaf, just remove it
                if (parent.left === del) {  // node is left child of parent
                    parent.left = null;
                    parent.removeLeft();
                } else {    // node is right child of parent
                    parent.right = null;
                    parent.removeRight();
                }
            } else if (del.left !== null && del.right !== null) {   // node has two children, complicated
                let successor = getLeftMostChild(del.right, del);
            
                successor.leftCount = del.leftCount;
                successor.rightCount = del.rightCount - 1;
                if (successor.rightCount === 0) {
                    successor.right = null;
                }  else {
                    successor.right = del.right;
                }

                if (parent.left === del) {
                    parent.left = successor;
                } else {    // node is right child of parent    
                    parent.right = successor;
                }
            } else if (del.left !== null) { // node only has left child
                if (parent.left === del) {  // node is left child of parent
                    parent.left = del.left;
                    parent.removeLeft();
                } else {    // node is right child of parent
                    parent.right = del.left;
                    parent.removeRight();
                }
            } else {    // node only has right child
                if (parent.left === del) {  // node is left child of parent
                    parent.left = del.right;
                    parent.removeLeft();
                } else {    // node is right child of parent
                    parent.right = del.right;
                    parent.removeRight();
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
}

/**
 * Compute probabilities for choosing self, left subtree, and right subtree
 * and choose based of those probabilities
 * @param {Number} leftCount Number of nodes in left subtree
 * @param {Number} rightCount Number of nodes in right subtree
 */
function weightedRandom(leftCount, rightCount) {
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

function randomNode(curr) {
    if (!curr) {    // no nodes in tree
        return null;
    } else if (curr.leftCount === 0 && curr.rightCount === 0) { // we are last node in tree
        // don't compute probability, just return yourself
        return curr;
    } else {
        // choose which tree to explore based off number of nodes in subtrees
        let choice = weightedRandom(curr.leftCount, curr.rightCount);

        if (choice === "self") {    // choose self
            return curr;
        } else if (choice === "left") { // choose left subtree
            return randomNode(curr.left);
        } else {    // choose right subtree
            return randomNode(curr.right);
        }
    }
}


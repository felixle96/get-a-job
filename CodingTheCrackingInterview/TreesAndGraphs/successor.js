class Node {
    constructor(val) {
        this.val = val;
        this.left = this.right = null;
    }
}

function constructTree(arr) {
    let queue = [];
    let tree = new Node(arr[0]);
    queue.push({ node: tree, index: 0 });

    while (queue.length) {
        // get current node and index position
        let curr = queue.shift();
        let parent = curr.node;
        let parentIndex = curr.index;

        // compute current node's left and right child position/value
        let leftIndex = parentIndex * 2 + 1;
        let rightIndex = parentIndex * 2 + 2;
        let left = arr[leftIndex];
        let right = arr[rightIndex];

        if (left !== undefined) { // add left child if exists
            let leftNode = left === null ? null : new Node(left);
            if (leftNode) {
                queue.push({ node: leftNode, index: leftIndex });
            }
            parent.left = leftNode;
        }

        if (right !== undefined) {    // add right child if exists
            let rightNode = right === null ? null : new Node(right);
            if (rightNode) {
                queue.push({ node: rightNode, index: rightIndex });
            }
            parent.right = rightNode;
        }
    }

    return tree;
}

function printTree(root) {
    let queue = [];
    queue.push(root);

    while (queue.length) {
        let curr = queue.shift();

        console.log('curr: ', curr.val);

        if (curr.left) {
            queue.push(curr.left);
        }

        if (curr.right) {
            queue.push(curr.right);
        }
    }
}

function successor(root, target) {
    function findSuccessor(curr, target) {
        if (curr === null) {    // reached end of tree
            return { found: false, successor: null };
        } else {    // keep searching tree
            if (curr.val === target.val) {  // found target
                // search for left most child of right subtree if it exists
                let leftMost = getLeftMostChild(curr.right);

                return { found: true, successor: leftMost };
            } else {    // didn't find  target, search children
                let left, right;
                if (target.val <= curr.val) {   // search left subtree
                    left = findSuccessor(curr.left, target);
                } else {    // search right subtree
                    right = findSuccessor(curr.right, target);
                }

                let result = (left === undefined) ? right : left;
                if (result.found === false || result.successor !== null) {
                    /**
                     * Either didn't find target or found successor. Either way
                     * nothing to do here, return result
                     */
                    return result;
                } else {    // found target, but didn't find successor 
                    if (left) { // if target was in your left subtree, then you are successor
                        result.successor = curr;
                    } else {
                        // return until you are the left descendant of a node
                    }

                    return result;
                }
            }
        }
    }

    let result = findSuccessor(root, target);

    return result.successor;
}

function getLeftMostChild(curr) {
    if (curr === null) {    // reached end of tree
        return null;
    } else {    // continue searching tree
        let left = getLeftMostChild(curr.left);
        let right;

        if (left) { // found left most child
            return left;
        } else {
            return curr;
        }
    }
}

function main() {
    let arr = [9, 5, 14, 3, 7, 11, 17, 0, 4, 6, 8, 10, 13, 15, 19];
    let root = constructTree(arr);
    let target = { val: 17};

    printTree(root);

    console.log('successor: ', successor(root, target));
}

main();
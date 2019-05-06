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

function validateBST(root) {
    let lower = Number.NEGATIVE_INFINITY, upper = Number.POSITIVE_INFINITY;

    function validateSubtree(root, lower, upper) {
        if (root === null) {    // reached end, defaults to valid BST
            return true;
        } else {
            // validate left and right
            let left = validateSubtree(root.left, lower, root.val);
            let right = validateSubtree(root.right, root.val, upper);

            // validate self
            let selfValid = (lower < root.val && root.val <= upper) ? true : false;

            return left && right && selfValid;
        }
    }

    return validateSubtree(root, lower, upper);
}

function main() {
    // let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, null, null, 11, 12, null, null];
    let arr = [10, 7, 15, 3, 8, 13, 17, null, 5, null, 9, null, 13];
    let root = constructTree(arr);

    printTree(root);

    console.log('validateBST(): ', validateBST(root));
}

main();
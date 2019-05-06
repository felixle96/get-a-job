class Node {
    constructor(val) {
        this.val = val;
        this.left = this.right = null;
    }
}

function checkBalance(root) {
    let result;

    function dfsBalance(root) {
        if (!root) {    // reached end of tree
            return { height: -1, balanced: true };
        } else {    // need to continue traversing tree
            // compute height of children
            let left = dfsBalance(root.left);
            let right = dfsBalance(root.right);

            if (!left.balanced || !right.balanced || Math.abs(left.height - right.height) > 1) {    // not balanced
                return { balanced: false };
            } else {    // continue height and balance computations
                let height = Math.max(left.height, right.height) + 1;
                return { 'height': height, balanced: true };
            }
        }
    }

    result = dfsBalance(root);

    return result.balanced;
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

function main() {
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, null, null, 11, 12, null, null];
    let root = constructTree(arr);

    printTree(root);

    console.log('checkBalance(): ', checkBalance(root));
}

main();
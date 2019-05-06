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

// determines whether curr could be our parent
function isParent(curr, target1, target2) {
    if (curr !== null) {
        return !(curr === target1 || curr === target2);
    } else {
        return false;
    }
}

function isTarget(curr, target1, target2) {
    if (curr !== null) {
        return curr === target1 || curr === target2;
    } else {
        return false;
    }
}

/**
 * Returns firstCommonAncestor if possible, false if neither targets are
 * in tree, or true if only one of them is.
 * @param {*} curr 
 * @param {*} node1 
 * @param {*} node2 
 * @param {*} parent 
 * @param {*} found 
 */
function firstCommonAncestor(curr, node1, node2, parent, found = false) {
    if (curr === null) {    // reached end of tree
        return null;
    } else {    // continue searching tree
        if (curr === node1 || curr === node2) { // found one of our targets
            if (found === false) {  // not yet found second target, may be in our subtrees
                found = true;
                let left = firstCommonAncestor(curr.left, node1, node2, curr, found);
                let right = firstCommonAncestor(curr.right, node1, node2, curr, found);

                if (isTarget(left, node1, node2) || isTarget(right, node1, node2)) {  // parent is ancestor
                    return parent;
                }

                // only one target found in this subtree
                return (curr === node1) ? node1 : node2;
            } else {    // already found a target, so found everyone no need to keep searching
                return (curr === node1) ? node1 : node2;
            }
        } else {    // didn't find any targets, search our subtrees    
            let left = firstCommonAncestor(curr.left, node1, node2, curr, found);
            let right = firstCommonAncestor(curr.right, node1, node2, curr, found);

            if (isTarget(left, node1, node2) && isTarget(right, node2, node2)) {  // found all targets, we are the ancestor
                return curr;
            } else if (isParent(left, node1, node2) || isParent(right, node1, node2)) {    // already found ancestor, just return it
                let result = left === null ? right : left;
                return result;
            } else {    // return our result (either a target found, or none found)
                return (left === null) ? right : left;
            }
        }
    }
}

function main() {
    let arr = [9, 5, 14, 3, 7, 11, 17, 0, 4, 6, 8, 10, 13, 15, 19];
    let root = constructTree(arr);
    let target1 = root.left.left.right;
    let target2 = root.left.left;
    // let target1 = {val: 33, left: null, right: null};
    // let target2 = {val: 45, left: null, right: null};

    printTree(root);

    console.log(`firstCommonAncestor(${target1.val}, ${target2.val}): `, firstCommonAncestor(root, target1, target2));
}

main();
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

function treeEqual(tree1, tree2) {
    // console.log('treeEqual() tree1: ', tree1.val, ' , tree2: ', tree2.val);
    if (tree1 === null && tree2 === null) {  // reached end of tree, trees are equal so far
        return true;
    } else if (tree1 === null || tree2 === null || tree1.val !== tree2.val) {   // trees aren't equal
        return false;
    } else {    // search rest of trees
        let left = treeEqual(tree1.left, tree2.left);
        let right = treeEqual(tree1.right, tree2.right);

        // only return true if both subtrees are equal
        return left && right;
    }
}

function checkSubtree(tree1, tree2) {
    if (tree1 === null) {   // end of tree1
        return false;
    } else {    // keep searching tree1 for root of tree2
        if (tree1.val === tree2.val) {  // found potential root of tree2
            let isEqual = treeEqual(tree1, tree2);  

            if (isEqual === true) { // subtree of tree1 is equal to tree2
                return true;
            }
        }

        // by this point: we know tree2 is not yet subtree of tree1, check tree1's other subtrees
        let left = checkSubtree(tree1.left, tree2);
        let right = checkSubtree(tree1.right, tree2);

        // return true if either subtree is equal to tree2
        return left || right;
    }
}

function main() {
    let arr1 = [9, 5, 14, 3, 7, 11, 17, 0];
    let arr2 = [5, 3, 7, 0];
    let root1 = constructTree(arr1);
    let root2 = constructTree(arr2);
    
    console.log('TREE1');
    printTree(root1);
    console.log('TREE2');
    printTree(root2);

    console.log('checkSubtree(tree1, tree2): ', checkSubtree(root1, root2));
}

main();
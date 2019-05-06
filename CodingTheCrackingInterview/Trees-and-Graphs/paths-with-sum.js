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

function pathsWithSum(root, target) {
    let numPaths = 0;

    function pathSum(curr, target, sum = 0, path=[]) {
        if (curr === null) {    // end of path
            return;
        } else {    // keep summing paths

            sumFromHere(curr, target);
            pathSum(curr.left, target);
            pathSum(curr.right, target);
        }
    }

    function sumFromHere(root, target, sum = 0, path = []) {
        if (root === null) {
            return;
        }

        sum += root.val;
        path.push(root.val);

        if (sum === target) {
            numPaths++;
            console.log('PATHS: ', numPaths, ' , path: ', path)
        }
        
        sumFromHere(root.left, target, sum, path);
        sumFromHere(root.right, target, sum, path);
        path.pop();
    }

    pathSum(root, target);

    return numPaths;
}

function main() {
    // let arr = [10, 5, 15, 3, 7, 12, 18, 1, 4, 6, 8, 11, 14, 17, 20];
    let arr = [5,-3,2,1,2,3,-2,-2,4,3,5,6,-3,1,3,3,2,-3,0,null,null,null,null,5,2,2,3];
    let root = constructTree(arr);
    let target = 6;

    printTree(root);
    console.log(`pathsWithSum(target=${target}): `, pathsWithSum(root, target));
}

main();
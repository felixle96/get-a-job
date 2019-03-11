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

function bstSequences(root) {
    let result = [];

    function topologicalSequences(possible, path) {
        if (possible.length === 0) {  // no more possible paths
            // store path before stopping
            console.log('pushing path: ', path);
            result.push(path.slice());
        } else {    // try every possible path
            console.log('possible: ', possible);
            for (let i = 0; i < possible.length; i++) {
                let choice = possible[i];   // get a possible choice
                let poss = possible.slice();    // copy possible choices to give to children

                // remove choice from children's possibilities
                poss.splice(i, 1);

                if (choice.left) { // found another possible choice
                    poss.push(choice.left);
                }

                if (choice.right) { // found another possible choice 
                    poss.push(choice.right);
                }

                // choose choice and give to children
                path.push(choice.val);
                topologicalSequences(poss, path);

                // revert our path
                path.pop();
            }

        }
    }

    topologicalSequences([root], []);

    return result;
}

function bstSequences1(curr) {
    if (!curr) {    // reached end of tree
        return [];
    } else {
        let leftPoss = bstSequences1(curr.left);
        let rightPoss = bstSequences1(curr.right);
        let poss = [];

        if (leftPoss.length === 0 && rightPoss.length === 0) {
            poss.push([curr.val]);
        }

        for (let i = 0; i < leftPoss.length; i++) {
            for (let j = 0; j < rightPoss.length; j++) {
                let weaveResult = weave(leftPoss[i], rightPoss[j], curr.val);
                poss = poss.concat(weaveResult);
            }
        }

        return poss;
    }
}

function weave(arr1, arr2, prepend) {
    let allArrs = [];

    function recWeav(arr1, arr2, path = []) { // recursively weave together all orders
        if (arr1.length === 0 && arr2.length === 0) {    // used all vals in arr, store path
            allArrs.push(path.slice());
        } else {    // keep generating possibilities
            if (arr1.length > 0) {
                path.push(arr1.shift());
                recWeav(arr1, arr2, path);
                arr1.unshift(path.pop());
            }

            if (arr2.length > 0) {
                path.push(arr2.shift());
                recWeav(arr1, arr2, path);
                arr2.unshift(path.pop());
            }
        }
    }

    recWeav(arr1, arr2, [prepend]);
    return allArrs;
}

function main() {
    let arr = [9, 5, 14, 3, 7, 11, 17];
    let root = constructTree(arr);

    printTree(root);

    let bst = bstSequences(root);
    let bst1 = bstSequences1(root);
    console.log(`bstSequences(${arr}): `, bst);
    console.log(`bstSequences1(${arr}): `, bst1);

    console.log('bst.length: ', bst.length, " , bst1.length: ", bst1.length);
}

main();
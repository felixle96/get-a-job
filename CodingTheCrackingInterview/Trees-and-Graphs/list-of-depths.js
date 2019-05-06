class Node {
    constructor (val) {
        this.val = val;
        this.left = this.right = null;
    }
}

class LevelNode {
    constructor (node, level) {
        this.node = node;
        this.level = level;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    insert(node) {
        if (this.head) {
            this.head = {val: node, next: this.head};
        } else {    // list is empty
            this.head = {val: node, next: null};
        }
        this.length++;
    }

    size() {
        return this.length;
    }

    print() {
        let curr = this.head;
        while(curr) {
            console.log('curr.val: ', curr.val.val);
            curr = curr.next;
        }
    }
}

function treeInsert(node, val) {
    if (node === null) {
        return new Node(val);
    } else {
        if (val <= node.val) {
            node.left = treeInsert(node.left, val);
        } else {
            node.right = treeInsert(node.right, val);
        }

        return node;
    }
}

function listOfDepths(tree) {
    let queue = []; // for BFS, no need for visited b/c tree not graph
    let depthsList = [];    // store list of depths in here
    let currLevel = 0;
    queue.push(new LevelNode(tree, currLevel));

    while(queue.length) {   // visit every node
        // get node info from queue
        let levelNode = queue.shift();
        let node = levelNode.node;

        // insert node into list of depths
        let level = levelNode.level;
        if (level === currLevel) {  // insert node into front of list for its level
            levelNode.next = depthsList[level];
            depthsList[level] = levelNode;
        } else {    // level increased, it will be first node of its level
            depthsList.push(levelNode);
            currLevel++;
        }

        if (node.right) {    // visit left node
            queue.push(new LevelNode(node.right, levelNode.level + 1));
        }

        if (node.left) {   // visit right node
            queue.push(new LevelNode(node.left, levelNode.level + 1));
        }
    }

    return depthsList;
}

function listOfDepthsBFS(root) {
    let result = [];
    let current = new LinkedList();

    current.insert(root);
    while (current.size() > 0) {
        // push previous level onto results
        result.push(current);

        // visit previous level's children
        let parent = current.head;
        current = new LinkedList();
        while (parent) {    // insert previous level's children
            if (parent.val.left) {
                current.insert(parent.val.left);
            }

            if (parent.val.right) {
                current.insert(parent.val.right);
            }

            parent = parent.next;
        }
    }

    return result;
}

function listOfDepthsDFS(root) {
    let result = [];

    function DFS(root, level=0) {
        if (!root) {
            return;
        } else {
            // insert yourself
            if (result[level]) {
                result[level].insert(root);
            } else {
                result[level] = new LinkedList();
                result[level].insert(root);
            }

            // insert your children
            DFS(root.left, level + 1);
            DFS(root.right, level + 1);
        }
    }

    DFS(root);

    return result;
}

function main() {
    let root = new Node(9);

    for (let i = 0; i < 20; i = i + 2) {
        treeInsert(root, i);
    }

    console.log('root: ', JSON.stringify(root));

    console.log("listOfDepths(): ");
    let depthsList = listOfDepths(root);
    depthsList.forEach((levelNode) => {
        let curr = levelNode;
        console.log("LEVEL: ", levelNode.level);
        while (curr) {
            console.log('val: ', curr.node.val);
            curr = curr.next;
        }
    });

    console.log("resultBFS(): ");
    let resultBFS = listOfDepthsBFS(root);
    // console.log(resultBFS);
    resultBFS.forEach((list, i) => {
        console.log("LEVEL: ", i);
        list.print();
    })

    console.log("resultDFS(): ");
    let resultDFS = listOfDepthsDFS(root);
    // console.log(resultBFS);
    resultDFS.forEach((list, i) => {
        console.log("LEVEL: ", i);
        list.print();
    })
}

main();


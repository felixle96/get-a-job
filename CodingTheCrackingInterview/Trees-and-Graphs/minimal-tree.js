class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function minimalTree(arr) {
    function recBuild(arr, start, end) {
        if (start === end) {    // partition is size one
            return new Node(arr[start]);
        } else if (start < end) {   // keep recursively building
            // get middle node
            let mid = Math.floor((start + end) / 2);
            let curr = new Node(arr[mid]);;

            // rec build left and right sub trees
            curr.left = recBuild(arr, start, mid - 1);
            curr.right = recBuild(arr, mid + 1, end);

            // return
            return curr;
        } else {    // nothing to access just return
            return;
        }
    }

    return recBuild(arr, 0, arr.length - 1);
}

function printList(list) {
    let queue = [];
    queue.push(list);

    while(queue.length) {
        let curr = queue.shift();
        console.log('curr: ', curr);

        if (curr.left) {
            queue.push(curr.left);
        } 

        if (curr.right) {
            queue.push(curr.right);
        }
    }
}

function main() {
    let arr = [0,1,2,3,4,5,6,7,8,9,10,11,12];
    let list = minimalTree(arr);

    console.log('list: ', list);

    printList(list);
}

main();
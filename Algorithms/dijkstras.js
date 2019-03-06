class PriorityQueue {
    constructor() {
        this.heap = []; // binary heap by weights
        this.map = new Map();   // key: heap node value, value: node index in heap
    }

    length() {
        return this.heap.length;
    }

    lowerPriority(updateVertex, updateWeight) {
        let index = this.map.get(updateVertex);  // get index of node in heap;
        let node = this.heap[index];    // get node from heap

        if (node && updateWeight < node.w) {    // only update if new weight is lower
            node.w = updateWeight;

            // reminify heap
            let grandParent = Math.floor((index - 1) / 2);
            let left = 2 * index + 1;
            let right = 2 * index + 2;

            if (this.heap[grandParent] && this.heap[grandParent].w > node.w) {  // have to fix top sections of heap
                this.siftUp(index);
            } else if (this.heap[left] && this.heap[left] < node.w || this.heap[right] && this.heap[right].w < node.w) { // have to fix bottom sections of heap
                this.siftDown(index);
            }
        }
    }

    /**
     * Remove smallest value from heap
     */
    extractMin() {
        // swap root and last element
        let min = this.heap[0];
        let last = this.heap.pop();

        if(this.heap.length !== 0) {    // only put last value at root if heap not empty
            this.heap[0] = last;    
        }

        // delete old root's map entry
        this.map.delete(min.v);

        // minify heap again
        this.siftDown(0);

        return min;
    }

    /**
     * Insert node and it's weight into priority queue
     * 
     * @param {int} vertex // node value 
     * @param {int} weight // node weight
     */
    insert(vertex, weight) {
        /**
         * Insert element into heap and keep track of index
         * in map
         */
        this.heap.push({ v: vertex, w: weight });
        this.map.set(vertex, this.heap.length - 1);
        // fix the min heap property
        this.siftUp(this.heap.length - 1);
    }

    /**
     * Swap elements so parent is smallest of itself and its
     * two children
     * 
     * @param {*} start Index to minify
     */
    sift(start) {
        let parent = start;
        if (start < this.heap.length && start >= 0) { // node is valid
            let left = 2 * start + 1;
            let right = 2 * start + 2;
            let grandParent = Math.floor((start - 1) / 2);

            if (this.heap[left] && this.heap[left].w < this.heap[parent].w) {    // left child should be new parent
                parent = left;
                this.map.set(this.heap[left].v, parent);
            }

            if (this.heap[right] && this.heap[right].w < this.heap[parent].w) { // right child should be new parent
                parent = right;
            }

            // console.log(`start=${start}, parent=${parent}, left=${left}, right=${right}`)
            if (start !== parent) { // parent changed so perform the swap and sift up
                // swap node in heap
                let temp = this.heap[parent];
                this.heap[parent] = this.heap[start];
                this.heap[start] = temp;

                // swap value -> index mapping
                this.map.set(this.heap[parent].v, parent);
                this.map.set(this.heap[start].v, start);

                return parent;
            }
        } else {
            return null;
        }
    }

    /**
     * Rebalance/set heap so that it will be a min heap downwards
     * @param {int} start Heap index to rebalance/sift from 
     */
    siftDown(start) {
        let index = this.sift(start);

        if (index !== null && index !== start) {    // heap was changed so continue
            this.siftDown(index);
        }
    }

    /**
     * Rebalance/sift heap so that it will be a min heap upwards
     * 
     * @param {int} index Heap index to rebalance/sift heap from 
     */
    siftUp(start) {
        let grandParent = Math.floor((start - 1) / 2);
        let index = this.sift(start);

        if (index !== null && grandParent < this.heap.length && grandParent >= 0) { // heap was changed so continue
            this.siftUp(grandParent);
        }
    }

    printHeap() {
        console.log(`PriorityQueue::printHeap(): ${JSON.stringify(this.heap)}`);
    }

    printMap() {
        console.log(this.map);
    }
}

class Graph {
    constructor(numV) {
        this.numV = numV;
        this.adjList = new Map();
    }

    addEdge(start, end, weight) {
        if (this.adjList.has(start)) {  // already entry in graph, append to it
            this.adjList.get(start).push({ "end": end, "weight": weight });
        } else {    // create new entry
            this.adjList.set(start, [{ "end": end, "weight": weight }]);
        }
    }

    getAdjList(vertex) {
        return this.adjList.get(vertex);
    }

    print() {
        console.log('Graph::print()')
        console.log(this.adjList);
    }
}

function main() {
    let graph = new Graph(9);
    let start = 0;
    let end = 5;

    graph.addEdge(0, 1, 4);
    graph.addEdge(0, 7, 8);
    graph.addEdge(1, 0, 4);
    graph.addEdge(1, 2, 8);
    graph.addEdge(1, 7, 11)
    graph.addEdge(2, 1, 8);
    graph.addEdge(2, 3, 7);
    graph.addEdge(2, 8, 2);
    graph.addEdge(2, 5, 4);
    graph.addEdge(3, 2, 7);
    graph.addEdge(3, 4, 9);
    graph.addEdge(3, 5, 14);
    graph.addEdge(4, 3, 9);
    graph.addEdge(4, 5, 10);
    graph.addEdge(5, 6, 2);
    graph.addEdge(5, 2, 4);
    graph.addEdge(5, 3, 14);
    graph.addEdge(5, 4, 10);
    graph.addEdge(6, 5, 2);
    graph.addEdge(6, 7, 1);
    graph.addEdge(6, 8, 6);
    graph.addEdge(7, 0, 8);
    graph.addEdge(7, 1, 11);
    graph.addEdge(7, 8, 7);
    graph.addEdge(7, 6, 1);
    graph.addEdge(8, 2, 2);
    graph.addEdge(8, 6, 6);
    graph.addEdge(8, 7, 7);

    let shortestPath = dijkstras(graph, start, end);
    console.log(shortestPath);
}

function dijkstras(graph, start, end) {
    let priority = new PriorityQueue();
    let shortestPath = [];    // keep track of weights of visited nodes
    console.log(`dijkstras() start:${start}, end=${end}`);
    // initialize priority queue
    graph.adjList.forEach(function(value, key) {
        if (key !== start) {
            priority.insert(key, Number.POSITIVE_INFINITY);
        } else {
            priority.insert(key, 0);
        }
    })

    while(priority.length() > 0) {    // keep going until we've visited all nodes
        // get shortest path node
        let curr = priority.extractMin();
        let adjList = graph.getAdjList(curr.v);

        // update weights of its adjacent nodes
        for (let i = 0; i < adjList.length; i++) {
            priority.lowerPriority(adjList[i].end, curr.w + adjList[i].weight);
        }

        // add current node to our shortest path
        shortestPath.push(curr);
    }

    return shortestPath;
}

main();
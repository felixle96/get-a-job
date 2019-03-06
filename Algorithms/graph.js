class Graph {
    constructor(numV) {
        this.numV = numV;
        this.adjList = new Array(numV);
        for (let i = 0; i < this.adjList.length; i++) {
            this.adjList[i] = [];
        }
        this.ItBFS = this.ItBFS.bind(this);
    }

    ItBFS(start) {
        let visited = new Array(this.adjList.length).fill(false);   // keep track of visited nodes to prevent infinite cycling
        let queue = []; // queue of nodes to visit
        queue.unshift(start);    // push starting node on queue
        visited[start] = true;

        while(queue.length !== 0) {   // keep BFS while queue is not empty
            // console.log(`queue: ${queue}, visited: ${visited}`);
            let curr = queue.pop();   // dequeue node
            let currAdj = this.adjList[curr];   // get adj list
            // console.log(`visited node: ${curr}, adjList: ${currAdj}`);

            for(let i = 0; i < currAdj.length; i++) {  // add adj nodes to queue
                if (visited[currAdj[i]] === false) {   // add node if not visited
                    visited[currAdj[i]] = true;
                    queue.unshift(currAdj[i]);
                }
            }

            console.log(`visited node: ${curr}`);
        }
    }

    RecBFS(start) {
        let visited = new Array(this.numV).fill(false);
        let queue = [];
        queue.push(start);
        visited[start] = true;

        function recBFS() {
            let curr = queue.shift();   // remove current element from queue;
    
            if (curr === undefined) {   // visited all elements BFS is done
                return;
            } else {    // continue BFS
                let currAdj = this.adjList[curr];
                for(let i = 0; i < currAdj.length; i++) {
                    if (visited[currAdj[i]] === false) {
                        visited[currAdj[i]] = true;
                        queue.push(currAdj[i]);
                    }
                }
    
                console.log(`visited: ${curr}`);
                recBFS();
            }
        }
        recBFS = recBFS.bind(this);


        recBFS();
    }

    RecDFS(start) {
        let visited = new Array(this.numV).fill(false);
        visited[start] = true;

        function recDFS(curr) {
            let adjList = this.adjList[curr];
            console.log(`recDFS visited: ${curr}`);
            for (let i = 0; i < adjList.length; i++) {  // DFS all edges
                // console.log(`recDFS: visited=${visited}, adjList[i]=${adjList[i]}`);
                if (visited[adjList[i]] === false) { // only visit if unvisited
                    visited[adjList[i]] = true;
                    recDFS(adjList[i], visited);
                }
            }
        }

        recDFS = recDFS.bind(this);
        return recDFS(start);
    }

    ItDFS(start) {
        let stack = [];
        let visited = new Array(this.numV).fill(false);
        visited[start] = true;
        stack.push(start);

        while(stack.length !== 0) {
            let curr = stack.pop();
            let adjList = this.adjList[curr];
            console.log(`ItDFS visited: ${curr}`);

            for (let i = adjList.length - 1; i >= 0; i--) {
                if (visited[adjList[i]] === false) {    // node is unvisited so visit it
                    visited[adjList[i]] = true;
                    stack.push(adjList[i]);
                }
            }
        }
    }

    print() {
        for(let i = 0; i < this.adjList.length; i++) {
            console.log(`vertex: ${i}, adj: ${this.adjList[i]}`);
        }
    }

    addEdge(v1, v2) {
        if (this.adjList[v1] === undefined) {
            this.adjList[v1] = [];
        }

        this.adjList[v1].push(v2);
    }
}

function main() {
    let start = 0;
    // let graph = new Graph(4); 
    // graph.addEdge(0, 1); 
    // graph.addEdge(0, 2); 
    // graph.addEdge(1, 2); 
    // graph.addEdge(2, 0); 
    // graph.addEdge(2, 3); 
    // graph.addEdge(3, 3); 
    // graph.addEdge(1, 0); 
    // graph.addEdge(0, 2); 
    // graph.addEdge(2, 1); 
    // graph.addEdge(0, 3); 
    // graph.addEdge(1, 4); 

    var g = new Graph(6); 
g.addEdge(0, 1); 
g.addEdge(0, 2); 
g.addEdge(1, 3); 
g.addEdge(1, 4); 
g.addEdge(2, 4); 
g.addEdge(3, 4); 
g.addEdge(3, 5); 
g.addEdge(4, 5);
g.addEdge(1, 0); 
g.addEdge(2, 0); 
g.addEdge(3, 1); 
g.addEdge(4, 1); 
g.addEdge(4, 2); 
g.addEdge(4, 3); 
g.addEdge(5, 3); 
g.addEdge(5, 4);

    g.print();
    // console.log(`ItBFS(${start}): ${graph.ItBFS(start)}`);
    // console.log(`RecBFS(${start}): ${graph.RecBFS(start)}`);
    console.log(`RecDFS(${start}): ${g.RecDFS(start)}`);
    console.log(`RecDFS(${start}): ${g.ItDFS(start)}`);
}

main();

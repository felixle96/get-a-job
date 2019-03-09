// /**
//  * Perform a bidirectional search between src and dest
//  * @param {*} graph 
//  * @param {*} src 
//  * @param {*} dest 
//  */
// function bidirectionalSearch(graph, src, dest) {
//     let qS = [], qD = [];   // queues for BFS
//     let visS = new Set(), visD = new Set(); // visited set for BFS
//     qS.push(src), qD.push(dest);    // start the BFS
//     visS.add(src), visD.add(dest);

//     while (qS.length && qD.length) {    // if one of the BFS ends, it's over
//         let cS = qS.shift(), cD = qD.shift();   // remove element from queue

//         console.log('cS: ', cS, ' , cD: ', cD);
//         if (visD.has(cS) || visS.has(cD)) {    // found collision between BFS of the two nodes
//             console.log('visS: ', visS, ' , visD: ', visD);
//             return true;    // route found
//         }

//         let adjS = graph.getAdj(cS), adjD = graph.getAdj(cD);
//         updateAdj(adjS, visS, qS);
//         updateAdj(adjD, visD, qD);
//         // console.log('qS: ', qS, " , qD: ", qD);
//     }

//     return false;
// }

function route(src, dest, graph) {
    let fromSrc = bfs(src, dest, graph);

    if (fromSrc) {  // found route one way no need to check second path
        return true;
    } else {
        return bfs(dest, src, graph);
    }
}

function bfs(src, dest, graph) {
    let queue = [];
    let visited = new Set();
    queue.push(src);
    visited.add(src);

    console.log('bfs()');
    while (queue.length) {
        let curr = queue.shift();

        if (curr === dest) {
            return true;
        }

        updateAdj(graph.getAdj(curr), visited, queue);
    }

    return false;
}

/**
 * Update queue given an adjList and visited Set
 * @param {*} adjList 
 * @param {*} visited 
 * @param {*} queue 
 */
function updateAdj(adjList, visited, queue) {
    if (adjList) {
        adjList.forEach((val) => {
            if (!visited.has(val)) {    // not yet visited
                visited.add(val);
                queue.push(val);
            }
        });
    }
}

class Graph {
    constructor() {
        this.adjList = new Map();
    }

    insertEdge(src, dest) {
        let adj = this.adjList.get(src);
        if (adj) {  // vertex's adjList exists
            adj.push(dest);
        } else {    // adjList doesn't exist, create it
            this.adjList.set(src, [dest]);
        }
    }

    getAdj(node) {
        return this.adjList.get(node);
    }
}

function main() {
    let graph = new Graph();
    let src = 1, dest = 5;

    graph.insertEdge(0, 1);
    graph.insertEdge(0, 4);
    graph.insertEdge(0, 5);
    graph.insertEdge(1, 3);
    graph.insertEdge(1, 4);
    graph.insertEdge(2, 1);
    graph.insertEdge(3, 2);
    graph.insertEdge(3, 4);

    console.log('graph.adjList: ', graph.adjList);
    console.log('route(): ', route(src, dest, graph));
    // console.log('bidirectionalSearch(): ', bidirectionalSearch(graph, src, dest));
}

main();
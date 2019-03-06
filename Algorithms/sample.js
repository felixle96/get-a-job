You are given a binary tree, consisting of node objects where each node has a pointer/reference to
its left and right children nodes.
 
Your task is to link the levels of the tree by setting a pointer/reference `s` on each node to be
the next node to the right on the same level, or null if it is the last node on its level.
 
Here is an example input tree:

things to keep track of:
* current
* head

              1                  
           /      \
       2             3           
     /  \         /    \
   4      5     5.5       6       
  /        \               \
 7          8               9
              /  \
              10  11
              / \
              12 13

Your code should set s on each node as shown by the arrows here:
 
              1                -> null
           /      \
       2      ->     3         -> null
     /  \              \
   4  ->  5      ->      6     -> null
  /        \              \
 7    ->    8     ->       9   -> null
 
Use the language of your choice.

1 -> [2,3,null]
2 -> [4,5,3]
3 -> [6, null]
4 -> [5, 7]
5 -> [8, 6]

class Node {
    constructor(l, r) {
        this.l = l;
        this.r = r;
        this.s = undefined; // not initialized; set this
    }
}
 
function link_the_tree(root) {
  // BFS 
  
  // keep track of which nodes to visit without queue
  
  let queue = [];
  
  queue.push([root, 0]);
  while(queue.length !== 0) {	// BFS while queue not empty
  	let [curr, level] = queue.shift();	// grab node from queue
    
    if (queue.length !== 0 && queue[0][1] === level) {	// something on queue, have sibling
    	curr.s = queue[0][0];
    } else {	// nothing on queue, no sibling
    	curr.s = null;
    }
    
    if (curr.l) {
    	queue.push([curr.l, level + 1]);
    }
    
    if (curr.r) {
    	queue.push([curr.r, level + 1]);
    } 
  }
}

function ltt2(root) {
  let head = root;	// first node on current level;
  let current = head;	// current node on level;
  
  while() {
		do {
  		// first thing: set children's siblings
    	if(current.l && current.r) {
    		current.l.s = current.r;
    	}
      
      if (current.r && current.s) {
      	if (current.s.l) {
        
        } else
      }
      
      current = current.s
    } while(current)
  }
}
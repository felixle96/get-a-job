class Trie {
    constructor(wordList) {
        this.root = new TrieNode();
        for (let i = 0; i < wordList.length; i++) { // add all words into trie
            this.root.addWord(wordList[i]);
        }
    }

    contains(prefix, exact) {
        let curr = this.root;

        for(let i = 0; i < prefix.length; i++) {    // search for every letter in trie sequentially
            let char = prefix[i];
            let child = curr.children.get(char);
            if(child) {   // char is in tree
                curr = child;
            } else {
                return false;
            }
        }

        // at this point we know all chars have been matched
        return !exact || curr.terminates;   // result depends whether on exact match is requested
    }
    
    print() {
        this.dfsPrint(this.root);
    }

    dfsPrint(curr) {
        console.log(curr);

        curr.children.forEach(function(val, key) {  // print children too
            this.dfsPrint(val);
        }, this);
    }
}

class TrieNode {
    constructor(char) {
        this.char = char;
        this.children = new Map();
        this.terminates = false;
    }

    addWord(word) {
        if (word === null || word.length === 0) {   // empty don't add
            return;
        }

        let firstChar = word.charAt(0);
        let child = this.children.get(firstChar);
        if (child === undefined) {    // substring not in tree yet
            // add to tree
            child = new TrieNode(firstChar);
            this.children.set(firstChar, child);
        }

        if (word.length > 1) {  // not at last char yet, continue
            child.addWord(word.substring(1));
        } else {    // word has terminated
            child.terminates = true;
        }
    }

    getChild(char) {
        return this.children.get(char);
    }
}

function main() {
    let trie = new Trie(['hello', 'hi', 'huge', 'head', 'are', 'bear']);

    trie.print();
    console.log(`trie.contains('hell', false): ${trie.contains('hell', false)}`);
    console.log(`trie.contains('hi', false): ${trie.contains('hi', false)}`);
    console.log(`trie.contains('bea', false): ${trie.contains('bea', false)}`);
    console.log(`trie.contains('hug', false): ${trie.contains('huges', false)}`);

}

main();
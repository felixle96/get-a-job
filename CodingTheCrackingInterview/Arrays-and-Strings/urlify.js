function urlify(str) {
    return str.split(" ").join("%20");
}

let str1 = 'hello there how is it going my dood';
console.log(`urlify(${str1}): ${urlify(str1)}`);
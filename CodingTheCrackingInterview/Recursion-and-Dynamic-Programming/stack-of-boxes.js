/**
 * Return stack of boxes with maximum height,
 * given that the height, width, and depth of a box
 * must be smaller than all below it.
 * @param {Array<Boxes>} boxes Boxes to stack.
 */
function stackOfBoxes(boxes) {
    let maxHeight = 0;

    function stackBoxes(boxes, currBox = null, curr = 0, height = 0) {
        // console.log(`currBox=${JSON.stringify(currBox)}, curr=${curr}, height=${height}`);
        if (curr > boxes.length - 1) {  // out of valid boxes to stack
            maxHeight = Math.max(height, maxHeight);
            return null;
        } 

        // pick a box to stack
        for (let i = curr; i < boxes.length; i++) {
            if (currBox === null || isSmaller(boxes[i], currBox)) {
                // we can choose this box
                stackBoxes(boxes, boxes[i], i + 1, height + boxes[i].h);
            }
        }
     
        maxHeight = Math.max(height, maxHeight);
    }

    stackBoxes(boxes);
    return maxHeight;
}

/**
 * Return stack of boxes with maximum height,
 * given that the height, width, and depth of a box
 * must be smaller than all below it.
 * @param {Array<Boxes>} boxes Boxes to stack.
 */
function stackOfBoxes1(boxes) {
    let maxHeight = 0;
    let heights = Array(boxes.length).fill(0);

    function stackBoxes(boxes, currBox = null, curr = 0) {
        if (curr >= boxes.length) {  // stacked all possible boxes
            return 0;
        }

        // stack some boxes
        let max = 0;
        for (let i = curr; i < boxes.length; i++) {
            if (currBox === null || isSmaller(boxes[i], currBox)) {
                heights[i] = Math.max(stackBoxes(boxes, boxes[i], i + 1) + boxes[i].h, heights[i]);
                max = Math.max(heights[i], max);
            }
        }

        return max;
    }

    stackBoxes(boxes);
    return Math.max(...heights);
}

function isSmaller(box1, box2) {
    return box1.h < box2.h && box1.w < box2.w && box1.d < box2.d;
}

function rand (max) {
    return Math.floor(Math.random() * max) + 1;
}

function main() {
    let boxes = [];
    let max = 300;

    for (let i = 0; i < 530; i++) {
        boxes.push({w: rand(max), h: rand(max), d: rand(max)});
    }

    // console.log('boxes: ');
    // console.log(boxes);

    boxes.sort(function(a, b) {
        return a.h < b.h;
    })
    // console.log('boxes sorted: ');
    // console.log(boxes);
    
    console.log('stackOfBoxes1(): ');
    let stack1 = stackOfBoxes1(boxes);
    console.log(stack1);

    console.log('stackOfBoxes(): ');
    let stack = stackOfBoxes(boxes);
    console.log(stack);
}

main();
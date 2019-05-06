/**
 * 
 * @param {*} image Image to rotate
 * Safe state: all pixels have a stable location
 * Unsafe state: there's a pixel that doesn't have a location in the image
 */

function rotateMatrix(image) {
    let N = image.length;

    for (let len = N, start = 0; len > 1; len = len - 2, start++) {  // rotate all pixels from outmost to inner layers
        let r = start; 
        for (let j = 0; j < len - 1; j++) { // iterate through pixels on a layer
            let c = start + j;
            let temp = image[r][c];
            for (let i = 0; i < 4; i++) { // rotate pixel until image is in a safe state
                // figure out where to put current pixel
                let r1 = c;
                let c1 = N - 1 - r;
    
                // save the dest pixel before storing current pixel
                let temp1 = image[r1][c1];
                image[r1][c1] = temp;
    
                // update current pixel to place next's info
                r = r1;
                c = c1;
                temp = temp1;
            }
        }
    }

    return image;
}

let image1 = [[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,16]];
let image2 = [[1,2,3], [4,5,6], [7,8,9]]
console.log(`rotateMatrix(${printMatrix(image1)}): ${printMatrix(rotateMatrix(image1))}`);
console.log(`rotateMatrix(${printMatrix(image2)}): ${printMatrix(rotateMatrix(image2))}`);

function printMatrix(image) {
    let rows = image.length;
    console.log('printMatrix()');
    for (let i = 0; i < rows; i++) {
        console.log(image[i]);
    }
}
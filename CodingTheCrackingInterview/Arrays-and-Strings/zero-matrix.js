function zeroMatrix(matrix) {
    let rowZero = new Set(), colZero = new Set();

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] === 0) {   // these rows/cols should be zeroed
                rowZero.add(row);
                colZero.add(col);
            } 
        }
    }

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (rowZero.has(row) || colZero.has(col)) {   // these rows/cols should be zeroed
                matrix[row][col] = 0;
            } 
        }
    }

    return matrix;
}

function printMatrix(image) {
    let rows = image.length;
    console.log('printMatrix()');
    for (let i = 0; i < rows; i++) {
        console.log(image[i]);
    }
}

let matrix1 = [[0,1,3], [0,0,5], [5,0,6], [7,8,7]];

console.log(`zeroMatrix(${printMatrix(matrix1)}): ${printMatrix(zeroMatrix(matrix1))}`);
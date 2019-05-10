const fs = require('fs');
const path = require('path');

class FileWriter {
    constructor(filename) {
        this.fd = fs.openSync(path.join(__dirname, filename), 'as');
        this.buffer = null;
    }

    setWriteBuffer(buffer) {
        this.buffer = buffer;
    }

    writeToFile() {
        fs.writeSync(this.fd, this.buffer);
        fs.writeSync(this.fd, Buffer.from('\n'));
    }

    closeFile() {
        fs.closeSync(this.fd);
    }
}

class FileReader {
    constructor(filename) {
        this.fd = fs.openSync(path.join(__dirname, filename), fs.constants.O_RDONLY);
        this.buffer = null;
    }

    /**
     * Read a set number of bytes from a file.
     * @param {File} file File to read from.
     * @param {Number} length Amount to read from file. 
     */
    readFile(length) {
        let newBuffer = Buffer.alloc(length, 0, 'utf8');
        let offset = this.buffer === null ? length - 1: this.buffer.lastIndexOf('\n');
        // copy any incomplete lines into buffer.
        if (this.buffer !== null && offset !== -1) {
            console.log('offset: ', offset + 1, 'length: ', this.buffer.length);
            this.buffer.copy(newBuffer, 0, offset + 1, this.buffer.length);
        }

        // read file synchronously and copy to buffer
        let bytesRead = fs.readSync(this.fd, newBuffer, length - offset - 1, offset + 1, null);
        console.log('bytesREad: ', bytesRead);
        this.buffer = newBuffer;
        
        return bytesRead;
    }

    closeFile() {
        fs.closeSync(this.fd);
    }

    getLines() {
        let offset = this.buffer === null ? 100 : this.buffer.lastIndexOf('\n');
        let lines = this.buffer.toString('utf8', 0, offset).split("\n");

        return lines;
    }

}

// 60 55 45 20 30 40 50
// 20 55 45 60 30 40 50
// 

function quickSort(arr, left, right) {
    let index = partition(arr, left, right);
    if (left < index - 1) { // sort left half
        quickSort(arr, left, index - 1)
    }

    if (index < right) {    // sort right half
        quickSort(arr, index, right);
    }
}

function partition(arr, left, right) {
    let pivot = arr[Math.floor((left + right)/2)];
    // while left and right markers haven't passed each other
    while (left <= right) {
        // find element on left that should be on right
        while (arr[left] < pivot) left++;

        // find element on right that should be on left
        while(arr[right] > pivot) right--;

        // swap elements and move markers
        if (left <= right) {
            let temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++, right--;
        }
    }

    return left;
}

function main() {
    let filename = 'file.txt'
    let fileReader = new FileReader(filename);

    let i = 0;
    while (fileReader.readFile(100) !== 0) {
        let fileWriter = new FileWriter('file-write' + i + '.txt');
        let lines = fileReader.getLines();
        quickSort(lines, 0, lines.length - 1);
        fileWriter.setWriteBuffer(Buffer.from(lines.join("\n")));
        fileWriter.writeToFile();
        // console.log('lines:\n', lines);

        i++;
    }

    fileReader.closeFile();
}

main();
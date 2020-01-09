//NOTE- This method of parsing a file name to seperate will not work for "complex" file extensions such as .tar.gz

const path = require('path');

exports.handler = function (originalFileName) {
    let filename = path.parse(originalFileName).name;
    let extension = path.parse(originalFileName).ext;
    return `${filename}_renamed${extension}`;
}
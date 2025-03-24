const fs = require ('fs');

function writeFile (filename, content) {
    fs.writeFileSync(filename, content);
    }

function readFile (filename) {
    return fs.readFileSync(filename, 'utf8');
    }

module.exports = {writeFile, readFile};
const fs = require ('fs');
const path = require ('path');

function readJsonFile(fileName) {
    const filePath = path.join(__dirname, fileName);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
    }

    function writeJsonFile(fileName, jsondData) {
        const filePath = path.join(__dirname, fileName);
        const dataToWrite = JSON.stringify(jsondData, null, 2);
        fs.writeFileSync(filePath, dataToWrite, 'utf8');
        }

        module.exports = { readJsonFile, writeJsonFile };
/*const fs = require ('fs');
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

        module.exports = { readJsonFile, writeJsonFile };*/

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data1.json');
 function readJsonFile () {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
        } catch (error) {
            console.error('Error reading file:', error);
            return null;
            }
            }

function writeJsonFile (newData) {
    try {
        const jsonString = JSON.stringify(newData, null, 2);
        fs.writeFileSync(filePath, jsonString, 'utf-8');
        } catch (error) {
            console.error('Error writing file:', error);
            }
            }
            module.exports = { readJsonFile, writeJsonFile };
            

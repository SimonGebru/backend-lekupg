const { log } = require('console');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data1.json');

const rawData = fs.readFileSync(filePath, 'utf8');
const parsedData = JSON.parse(rawData);

console.log("Läste in följande från filen data1.json:");
console.log(parsedData);

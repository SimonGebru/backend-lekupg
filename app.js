/*const {readJsonFile, writeJsonFile} = require('./jsonHandler');

const data = readJsonFile();
data.version += 1;
writeJsonFile(data);

console.log (`Version uppdaterad till: ${data.version}`);*/

/*const { add, subtract, multiply, divide } = require('./math');

console.log(`5 + 3 = ${add(5, 3)}`);
console.log(`10 + 7 = ${subtract(10, 7)}`);
console.log(`534254 * 3 = ${multiply(534254, 3)}`);
console.log(`1075943 / 67 = ${divide(1075943, 67)}`);*/ 

/*const { writeFile, readFile } = require('./fileHandler');

const filename = 'example.txt';
const content = 'Hej från andra sidan!';

writeFile (filename, content);

const result = readFile(filename);
console.log(result);*/

const config = require('./config');

console.log (`App: ${config.appName}, Version: ${config.version}, Körs på port: ${config.port}`);





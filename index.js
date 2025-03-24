const { readJsonFile, writeJsonFile } = require('./jsonHandler');

 const data = readJsonFile();
console.log('Innehållet i JSON-filen:', data);

const updatedData = {
    message: 'Hejsan från Node!',
    version: 2.0
  };
  
  writeJsonFile(updatedData);
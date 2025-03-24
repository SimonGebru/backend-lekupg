/*1. (import dateModule.js)

✅ Skapa en modul dateModule.js som returnerar dagens datum.    

✅ Importera den i server.js.    

const getCurrentDate = require('./dateModule');

console.log("Dagens datum är: ", getCurrentDate());*/

/* 2(egen övning baserad på tidigare)
const getCurrentTime = require('./timeModule');

console.log("Klockan är : ", getCurrentTime());*/

/* 3. egen övning, båda sammanslagna)
const getCurrentTimenDate = require('./dateTimeModule');

console.log ("Dagens datum och tid är: ", getCurrentTimenDate());*/


/* ✅ Skapa en modul som läser och skriver JSON-data till en fil.    

✅ Använd fs för att hantera JSON-filen.    
const {readJsonFile, writeJsonFile} = require('./jsonHandler');

const users = readJsonFile ('data.json');
console.log("Innehåll före:", users);

users.push ({name: "Lars", age: 30}); 

writeJsonFile('data.json', users);

console.log("Ny användare tillagd!"); */

/* 4.  Bygg en enkel loggningsmodul - Skapa en modul som loggar alla händelser i ett program till en textfil. 

const logEvent = require('./logger');

logEvent ('Programmet startade');
logEvent ('Användare Simon loggade in');*/

/* 5. Simulera en API-request - Skapa en modul som läser data från en JSON-fil och returnerar det som en falsk API-response när en server anropas.
const http = require('http');
const { getUsers } = require('./fakeApi');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/users') {
        const users = getUsers();

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(users));
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Sidan hittades inte');
            }
            });
            server.listen(3000, () => {
                console.log('Servern lyssnar på port 3000');
                }); */






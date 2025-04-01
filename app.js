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

/*const config = require('./config');

console.log (`App: ${config.appName}, Version: ${config.version}, Körs på port: ${config.port}`);*/

/*const logMessage = require('./logger');

logMessage ('App startades');
logMessage ('En användare loggade in');*/

/*const { saveUser, getUsers } = require('./database');

saveUser ('John Doe');
saveUser ('Jane Doe');

console.log('Registrerade användare:', getUsers());*/

/*const fs = require('fs');
const path = require('path');
const readline = require('readline-sync');

const filePath = path.join(__dirname, 'notes.txt');

let continueWriting = true;

while (continueWriting) {
  const note = readline.question('Skriv en anteckning: ');

  const timestamp = new Date().toLocaleString();
  const logEntry = `[${timestamp}] ${note}\n`;

  fs.appendFileSync(filePath, logEntry);
  console.log('✔️ Anteckningen sparades!\n');

  const svar = readline.question('Vill du skriva en till? (j/n): ');
  if (svar.toLowerCase() !== 'j') {
    continueWriting = false;
    console.log('\n👋 Tack för att du använde anteckningsappen!');
  }
}*/
/*const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

app.use (express.json());

function authenticate (req, res, next) {
    const authHeader = req.headers.authorization ;
    if (!authHeader || authHeader !== 'simon123') {
        return res.status(401).send({ message: 'Ogiltigt användarnamn eller lösenord' });
        }
        next();
        }

app.get ('/api/protected', authenticate, (req, res) => {
    res.json ({ message: 'Du har åtkomst till skyddad resurs!' });
    });


app.use ((req, res, next)=>{
    const log = `[${new Date().toLocaleString()}] ${req.method} ${req.url}`;
    console.log(log.trim());

    const logPath = path.join(__dirname, 'access.log');
    fs.appendFileSync(logPath, log);
    next();
});
const courses = [
    { id: 1, name: 'Javascript Grundkurs', description: 'Lär dig grundläggande JavaScript' },
    { id: 2, name: 'Backend med Express', description: 'Lär dig bygga en backend med Express' },
];

const users = [ 
    { id: 1, name: 'Simon Gebru', email: 'john@example.com' },
    { id: 2, name: 'Nastaran Zargari', email: 'jane@example.com ' }
    ];

app.get ('/api/name', (req, res) => {
    res.json ({name: 'Simon'});
    });
    app.get ('/api/greet/:name', (req, res) => {
        const name = req.params.name;
        res.json ({message: `Hej ${name}!`});
        });
        app.get ('/api/courses', (req, res) => {
            res.json (courses);
            });
    app.get ('/api/courses/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const course = courses.find(c => c.id === id);
        if (!course) {
            res.status(404).json ({message: 'Kursen hittades inte'});
            } 
            res.json (course);
            });

        app.get ('/api/status', (req, res) => {
            res.json ({status: 'OK'});
            });
    app.get ('/api/greet', (req, res) => {
        const name= req.query.name;
        if (!name) {
            res.status(400).json ({message: 'Namn saknas'});
            }
            res.json ({message: `Hej ${name}!`});
            });
    app.get ('/api/echo', (req, res) => {
        res.json (req.headers);
        });

    app.get ('/api/users', (req, res) => {
        const filePath = path.join(__dirname, 'users.json');
        const data = fs.readFileSync(filePath, 'utf8');
        const users = JSON.parse(data);
        res.json (users);
        });

    app.post ('/api/add', (req, res) => {
        const {name, description} = req.body;

        if (!name || !description) {
            return res.status(400).json ({error: 'Både namn och beskrivning är obligatoriska'}); 
            }
        
        const newCourse = {
            id: courses.length + 1,
            name,
            description
            };
            courses.push (newCourse);
            res.json (courses);
            });

    app.delete ('/api/courses/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const index = courses.findIndex(c => c.id === id);

        if (index === -1) {
            return res.status(404).json ({message: 'Kursen hittades inte'});
            }
        courses.splice (index, 1);
        res.json (courses);
        });
    app.put ('/api/courses/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const {name} = req.body;
        const course = courses.find(c => c.id === id);
        if (!course) {
            return res.status(404).json ({message: 'Kursen hittades inte'});
            }
        if (!name) {
            return res.status(400).json ({error: 'Namn är obligatoriskt'});
            }
            course.name = name;
            res.json (course);
            });
    app.patch ('/api/users/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const {name, email} = req.body;

        const user = users.find(u => u.id === id);

        if (!user) {
            return res.status(404).json ({message: 'Användaren hittades inte '});
            }
            if (name) user.name = name;
            if (email) user.email = email;  
            res.json (user);
            });

    app.listen(3000, () => {
        console.log('Servern lyssnar på port 3000');
        }); */
        require ('dotenv').config ();
        const express = require('express');
        const app = express();
        const fs = require('fs');
        const path = require('path');
        
        // Importera routers
        const userRouter = require('./routes/users');
        const petsRouter = require('./routes/pets');
        const carsRouter = require('./routes/cars');
        
        app.use ((req, res, next) => {
            const apiKey = req.header('x-api-key');
            const correctKey = process.env.API_KEY;
            const timestamp = new Date().toISOString();

            console.log(`[${timestamp}] API-nyckel: ${apiKey || 'saknas'}`);

            if (!apiKey || apiKey !== correctKey) {
                return res.status(401).json({ error: 'Ogiltig API-nyckel saknas eller är ogiltig'});
                }
                next();
            
        });

        app.set('trust proxy', true);

        app.use ((req, res, next) => {
            const timestamp = new Date().toISOString();
            const method = req.method;
            const url = req.url;
            const ip = req.ip || req.ip;
        
            const logMessage = `[${timestamp}] ${method} ${url} - IP: ${ip}`;
            console.log(logMessage);

            const logPath = path.join(__dirname, 'access.log');
            fs.appendFileSync(logPath, logMessage + '\n');
            next ();
            });

        app.use ((req,res,next) => {
            const start = Date.now ();

            res.on ('finish', () => {
                const duration = Date.now () - start;
                console.log(`Request till ${req.url} tog ${duration} ms`);
                });
                next ();
                });
            
        
        // Middleware för att hantera JSON
        app.use(express.json());
        app.use ('/static', express .static('public'));

        // Koppla routrar till endpoints
        app.use('/api/users', userRouter);
        app.use('/api/pets', petsRouter);
        app.use('/api/cars', carsRouter);
       
        
        // Starta servern
        app.listen(3000, () => {
          console.log('Servern lyssnar på port 3000');
        });





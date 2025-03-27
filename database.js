const fs = require ('fs');
const path = require ('path');

const filePath = path.join(__dirname, 'users.txt');

function saveUser(name) {
    const users = getUsers();

    if (users.includes(name)) {
        console.log(`Användare, "${name}" Finns redan`);
        return;
        }
    fs.appendFileSync (filePath, name + '\n');
    }

function getUsers() {
    if (!fs.existsSync(filePath)) return [];

    const content = fs.readFileSync(filePath, 'utf8');
    return content.split('\n').filter(Boolean);
    }

    module.exports = { saveUser, getUsers };

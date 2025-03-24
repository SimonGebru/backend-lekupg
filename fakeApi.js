const fs = require('fs');
const path = require('path');

function getUsers() {
    const filePath = path.join(__dirname, 'user.json');
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
    }

    module.exports = {
        getUsers
    }; 
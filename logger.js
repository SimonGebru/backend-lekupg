const fs = require('fs');
const path = require('path');

function logEvent(message) {
    const logFile = path.join(__dirname, 'log.txt');

    const now = new Date();
    const timestamp = now.toLocaleString();
    const fullmessage = `[${timestamp}] ${message}\n`;

    fs.appendFileSync(logFile, fullmessage, 'utf8');
    }

    module.exports = logEvent;
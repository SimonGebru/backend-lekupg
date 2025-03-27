/*const fs = require('fs');
const path = require('path');

function logEvent(message) {
    const logFile = path.join(__dirname, 'log.txt');

    const now = new Date();
    const timestamp = now.toLocaleString();
    const fullmessage = `[${timestamp}] ${message}\n`;

    fs.appendFileSync(logFile, fullmessage, 'utf8');
    }

    module.exports = logEvent;*/

    const fs = require('fs');
    const path = require('path');

    function logMessage(message) {
        const timestamp = new Date(). toISOString();
        const logEntry = `${timestamp} - ${message}\n`;

        const filePath = path.join(__dirname, 'log.txt');
        fs.appendFileSync(filePath, logEntry);
        }

        module.exports = logMessage;

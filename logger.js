const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, 'app.log');

const log = (level, message, data = null) => {
    const timestamp = new Date().toISOString();
    const logEntry = {
        timestamp,
        level,
        message,
        ...(data && { data })
    };

    const logString = JSON.stringify(logEntry);
    console.log(logString);

    fs.appendFileSync(LOG_FILE, logString + '\n');
};

module.exports = {
    info: (msg, data) => log('INFO', msg, data),
    warn: (msg, data) => log('WARN', msg, data),
    error: (msg, data) => log('ERROR', msg, data),
};

const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, name) => {
    const datetime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const item = `${datetime}\t${uuid()}\t${message}`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }

        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', name), item);
    } catch (err) {
        console.log(err);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}\n`, 'requestLogs.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}

module.exports = { logEvents, logger };
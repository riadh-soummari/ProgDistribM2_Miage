const cors = require('cors');
const config = require('../config');

const corsOptions = {
    origin: function(origin, callback) {
        if (origin === undefined || origin === null || origin === 'null') return callback(null, true);
        const whitelist = config.cors.whiteList[process.env.NODE_ENV === 'production' ? 'prod' : 'local'];
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

module.exports = cors(corsOptions);

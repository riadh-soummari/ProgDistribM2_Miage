const config = {};

/*config.https = {
    keyPath: "../Certificates/private-key.pem",
    certPath: "../Certificates/certificate.pem",
};*/

config.cors = {
    whiteList: {
        local: ['http://localhost:3000'], 
        prod: ['http://localhost:3000'], 
    },
};

config.rateLimit = {
    local: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 1000, 
    },
    prod: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 1000, 
    },
};

config.mongoURI = {
    local: "",
    prod: "mongodb+srv://riadhsoumari2016:bQ6JN9Qq2ZBfBqZP@database.sei53mn.mongodb.net/recipeserver",
}


module.exports = config
const constants = require('./constants');
const MongoClient = require('mongodb').MongoClient;

module.exports.postPowerRankings = function (request, response) {
    request.on('data', data => {
        const payload = JSON.parse(data.toString());
        if (payload) {
            response.status(200).end();
        } else {
            response.status(500).end();
        }
    });
        /*
        MongoClient.connect(constants.DATABASE.CONNECTION_STRING, (err, db) => {
            const result = db.collection(constants.DATABASE.NAME.GAMES).find({ week }).toArray();
            result.then(data => {
                 response.send(data);
                 db.close();
            });
        });
        */
};

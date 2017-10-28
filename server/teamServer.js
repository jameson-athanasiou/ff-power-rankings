const constants = require('./constants');
const MongoClient = require('mongodb').MongoClient;

module.exports.getTeams = function (request, response) {
    if (week) {
        MongoClient.connect(constants.DATABASE.CONNECTION_STRING, (err, db) => {
            //look for entry for teams. if it exists, overwrite it. if not, insert one
            const result = db.collection(constants.DATABASE.NAME.TEAMS).find({}).toArray();
            result.then(data => {
                 response.send(data);
                 db.close();
            });
        });
    }
};

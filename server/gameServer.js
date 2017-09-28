const constants = require('./constants');
const MongoClient = require('mongodb').MongoClient;

module.exports.postGame = function (request, response) {
    request.on('data', data => {
        const payload = JSON.parse(data.toString());
        const homeTeam = payload.homeTeam;
        const awayTeam = payload.awayTeam;
        const week = payload.week;
        const homeTeamScore = payload.homeTeamScore;
        const awayTeamScore = payload.awayTeamScore;
        if (homeTeam && awayTeam && week && homeTeamScore && awayTeamScore) {
            MongoClient.connect(constants.DATABASE.CONNECTION_STRING, (err, db) => {
                db.collection(constants.DATABASE.NAME.GAMES).insertOne({
                    homeTeam, awayTeam, week, homeTeamScore, awayTeamScore
                }).then(function (result) {
                    response.send({
                        message: 'game sent!'
                    });
                }, (err) => {
                    response.send({
                        message: err
                    });
                });
                db.close();
            });
        }
    });
};

exports.getGame = function (request, response) {
    const week = request.query.week;
    if (week) {
        MongoClient.connect(constants.DATABASE.CONNECTION_STRING, (err, db) => {
            const result = db.collection(constants.DATABASE.NAME.GAMES).find({ week }).toArray(); 
            result.then(data => {
                 response.send(data);   
                 db.close();
            });
        });
    }
};
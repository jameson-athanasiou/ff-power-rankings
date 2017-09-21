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
                    console.info('done!');
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


/*
app.get('/game', (request, response) => {
  MongoClient.connect(constants.DATABASE.CONNECTION_STRING, (err, db) => {
      db.collection(constants.DATABASE.NAME.TEAMS).insertOne({
        firstThing: '1'
      }).then(function(result) {
          response.send({
              message: 'team sent!'
          });
          console.info('done!');
      });

      db.close();
  });
});
*/

const constants = require('./constants');

app.post('/game', (request, response) => {
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

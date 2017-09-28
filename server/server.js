const bodyParser = require('body-parser');
const constants = require('./constants');
const gameServer = require('./gameServer');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');

const app = express();
const http = require('http').Server(app);

const port = process.env.PORT || 8080;
const environment = process.env.NODE_ENV;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));




app.use('/', express.static(path.resolve('dist')));
app.get('/game', gameServer.getGame);
app.post('/game', gameServer.postGame);

http.listen(port);
console.log(`Server listening on port ${port}`);

  app.post('/team', (request, response) => {
    MongoClient.connect(constants.DATABASE.CONNECTION_STRING, (err, db) => {
        db.collection(constants.DATABASE.NAME.TEAMS).insertOne({
          firstThing: '1'
        }).then(function(result) {
            response.send({
                message: 'team sent!'
            });
        });

        db.close();
    });
});

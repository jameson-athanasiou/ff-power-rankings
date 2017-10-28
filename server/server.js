const bodyParser = require('body-parser');
const constants = require('./constants');
const gameServer = require('./gameServer');
const powerRankingsServer = require('./powerRankingsServer');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const espnData = require('espn-fantasy-football-data');
const mongo_express = require('mongo-express/lib/middleware');
const mogno_express_config = require('../config/mongoExpress.config.js');

const app = express();
const http = require('http').Server(app);

const port = process.env.PORT || 8080;
const environment = process.env.NODE_ENV;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//webpack.devtool = 'source-map';
const compiler = webpack(webpackConfig);
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    reload: true,
    stats: {
        colors: true
    }
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/mongo_express', mongo_express(mogno_express_config));

app.use('/', express.static(path.resolve('dist/index.html')));
app.get('/game', gameServer.getGame);
app.post('/game', gameServer.postGame);
/*
app.get('/team', async (req, res) => {
    const data = await dataAccess.getEspnInfo();
    if (data) {
        res.status(200).send(data);
    } else {
        res.send(200).send({});
    }
});
*/
app.post('/powerRankings', powerRankingsServer.postPowerRankings);
esl
app.get('/standings', async (req, res) => {
    let status = 200;
    const data = await espnData.getStats();
    if (data) {
        res.status(status).send(data);
    } else {
        res.status(status).send({});
    }
});

http.listen(port);
console.log(`Server listening on port ${port}`); // eslint-disable-line no-console

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

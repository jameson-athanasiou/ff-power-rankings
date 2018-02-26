const bodyParser = require('body-parser');
const constants = require('./constants');
const gameServer = require('./gameServer');
const powerRankingsServer = require('./powerRankingsServer');
const express = require('express');
const espnAccessor = require('./espnAccessor');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const espnData = require('espn-fantasy-football-data');
const PowerRankingsOrchestrator = require('./PowerRankingsOrchestrator');
const dataAccessor = require('./dataAccessor');

const app = express();
const http = require('http').Server(app);

const port = process.env.PORT || 3000;
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

app.use('/', express.static(path.resolve('dist/index.html')));

app.get('/game', gameServer.getGame);
app.post('/game', gameServer.postGame);
app.post('/powerRankings', powerRankingsServer.postPowerRankings);

app.get('/standings', async (req, res) => {
    let status = 200;
    const data = await espnData.getStandings();
    if (data) {
        res.status(status).send(data);
    } else {
        res.status(status).send({});
    }
});

app.get('/scoreboard', async (req, res) => {
    let status = 200;
    const data = await espnData.getScoreBoard();
    if (data) {
        res.status(status).send(data);
    } else {
        res.status(status).send({});
    }
});

app.get('/stats', async (req, res) => {
    let status = 200;
    const data = await espnData.getStats();
    if (data) {
        res.status(status).send(data);
    } else {
        status = 500;
        res.status(status).send({});
    }
});

app.get('/espnData', async (req, res) => {
    let status = 200;
    const data = await espnAccessor.getEspnData();
    const orchestrator = new PowerRankingsOrchestrator();
    orchestrator.orchestrate(data);
    if (data) {
        res.status(status).send(data);
    } else {
        status = 500;
        res.status(status).send({});
    }
});

app.get('/dataFromFile', async (req, res) => {
    let status = 200;

    dataAccessor.getDataFromFile('leagueData').then(data => {
        if (data) {
            res.status(status).send(data);
        } else {
            status = 500;
            res.status(status).send({});
        }
    });
});


http.listen(port, () => {
    console.log(`Server listening on port ${port}`); // eslint-disable-line no-console
});
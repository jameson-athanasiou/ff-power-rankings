const bodyParser = require('body-parser');
const powerRankingsServer = require('./powerRankingsServer');
const express = require('express');
const espnAccessor = require('./espnAccessor');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
// const espnData = require('espn-fantasy-football-data');
const dataAccessor = require('./dataAccessor');
const analyze = require('./analyze');
const DataTable = require('./DataTable');

const app = express();
const http = require('http').Server(app);

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// webpack.devtool = 'source-map';
const compiler = webpack(webpackConfig);
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    reload: true,
    stats: {
        colors: true
    }
}));

app.use(require('webpack-hot-middleware')(compiler));

app.all('*', (req, res, next) => {
    if (req.originalUrl !== '/json' && req.originalUrl !== '/json/version') {
        console.log(`${req.method} ${req.originalUrl}`); // eslint-disable-line no-console
    }
    next();
});

app.use('/', express.static(path.resolve('dist/index.html')));

app.post('/powerRankings', powerRankingsServer.postPowerRankings);
//
// app.get('/standings', async (req, res) => {
//     const status = 200;
//     const data = await espnData.getStandings();
//     if (data) {
//         res.status(status).send(data);
//     } else {
//         res.status(status).send({});
//     }
// });
//
// app.get('/scoreboard', async (req, res) => {
//     const status = 200;
//     const data = await espnData.getScoreBoard();
//     if (data) {
//         res.status(status).send(data);
//     } else {
//         res.status(status).send({});
//     }
// });
//
// app.get('/stats', async (req, res) => {
//     let status = 200;
//     const data = await espnData.getStats();
//     if (data) {
//         res.status(status).send(data);
//     } else {
//         status = 500;
//         res.status(status).send({});
//     }
// });

app.get('/espnData', async (req, res) => {
    let status = 200;
    // const data = await espnAccessor.getEspnData();
    const data = await espnAccessor.getDataFromApi();
    if (data) {
        res.status(status).send(data);
    } else {
        status = 500;
        res.status(status).send({});
    }
});

app.get('/calculateRosterStrength', async (req, res) => {
    analyze.calculateRosterStrength().then((data) => {
        res.status(200).send(data || {});
    }, (err) => {
        res.status(500).send(err);
    });
});

app.get('/runAnalysis', async (req, res) => {
    dataAccessor.getDataFromFile('leagueData').then((data) => {
        if (data) {
            analyze.generatePowerRankings(data).then((analysis) => {
                res.status(200).send(analysis);
            }, (err) => {
                res.status(500).send(err);
            });
        } else {
            res.status(500).send({});
        }
    });
});

app.get('/tables', async (req, res) => {
    dataAccessor.getDataFromFile('leagueData').then((data) => {
        if (data) {
            const pointsPerGameTable = new DataTable('PointsPerGame');
            pointsPerGameTable.initializeFromDataSet(data.scoreboard);
            pointsPerGameTable.writeTableToFile();

            const gameOutComeTable = new DataTable('GameOutcomes');
            gameOutComeTable.initializeFromDataSet(data.scoreboard);
            gameOutComeTable.writeTableToFile();

            res.status(200).send({
                ppg: pointsPerGameTable.getTable(),
                outcomes: gameOutComeTable.getTable()
            });
        } else {
            res.status(500).send({});
        }
    });
});

app.get('/dataFromFile', async (req, res) => {
    let status = 200;
    dataAccessor.getDataFromFile('leagueData').then((data) => {
        if (data) {
            res.status(status).send(data);
        } else {
            status = 500;
            res.status(status).send({});
        }
    });
});

http.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

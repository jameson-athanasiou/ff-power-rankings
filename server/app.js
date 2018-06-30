const { getLeagueSettings, getRoster, getScoreboard } = require('./espnApi');
const dataAccessor = require('./legacy/dataAccessor');
const express = require('express');
const path = require('path');
const paths = require('../config/paths');
const webpack = require('webpack');

const webpackConfig = require(paths.webpackConfigFile);

const app = express();
const http = require('http').Server(app);

const port = process.env.PORT || 3000;

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

app.get('/leagueSettings', async (req, res) => {
    const { season } = req.query;
    if (season) {
        const data = await getLeagueSettings(season).catch(err => res.status(err.code || 500).send(err));
        res.status(200).send(data);
    } else {
        res.status(400).send({
            error: {
                message: 'Must provide a season'
            }
        });
    }
});

app.get('/roster', async (req, res) => {
    const { team, week } = req.query;
    if (team && week) {
        const data = await getRoster(team, week).catch(err => res.status(err.code || 500).send(err));
        res.status(200).send(data);
    } else {
        res.status(400).send({
            error: {
                message: 'Missing team or week'
            }
        });
    }
});


// TODO: remove this route
app.get('/runAnalysis', async (req, res) => {
    dataAccessor.getDataFromFile('leagueData').then((data) => {
        res.status(200).send(data);
    });
});

// TODO: remove this route
app.get('/scoreboard', async (req, res) => {
    const data = await getScoreboard(1);
    res.status(200).send(data);
});

app.use('/', express.static(path.resolve('dist/index.html')));
app.use('*', express.static(path.resolve('dist/index.html')));

http.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

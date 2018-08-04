const { getLeagueSettings, getRoster, getScoreboard } = require('./espnApi');
const dataAccessor = require('./legacy/dataAccessor');
const express = require('express');
const path = require('path');
const paths = require('../config/paths');
const Bundler = require('parcel-bundler');
const csv = require('node-csv').createParser();
const { scoreboardTable } = require('./tableManufacturer');

const app = express();
const http = require('http').Server(app);

const port = process.env.PORT || 3000;

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

app.get('/rosterStrength', async (req, res) => {
    csv.parseFile('config/data/2017/roster-strength-2017.csv', (err, data) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send(data.filter(row => row[0] !== 'Owner'));
        }
    });
});

// TODO: remove this route
app.get('/runAnalysis', async (req, res) => {
    dataAccessor.getDataFromFile('leagueData').then((data) => {
        res.status(200).send(data);
    });
});

// TODO: remove this route
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

app.get('/scoreboard', async (req, res) => {
    const { week } = req.query;
    let data = {};
    if (week) {
        data = await getScoreboard(week);
    }
    scoreboardTable();
    res.status(200).send(data);
});

const parcelOptions = {
    watch: true
};
const bundler = new Bundler(paths.indexHtml, parcelOptions);
app.use(bundler.middleware());

app.use('*', express.static(path.resolve('dist/index.html')));

http.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

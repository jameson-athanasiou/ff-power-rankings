const espnData = require('espn-fantasy-football-data');
const dataAccessor = require('./dataAccessor');
const { API, LEAGUE } = require('./constants');
const request = require('request');

const getRankings = async (week, position) => {
    const data = await espnData.getPlayerRankings(week, position);
    return data;
};

const getEspnData = async () => new Promise(async (resolve, reject) => {
    const standings = await espnData.getStandings();
    const scoreboard = await espnData.getScoreBoard();
    const stats = await espnData.getStats();

    const players = {};
    const playerPromises = [];

    for (let i = 1; i <= 12; i++) {
        const promise = espnData.getPlayers(i);
        playerPromises.push(promise);
        promise.then((data) => {
            players[`week${i}`] = data;
        });
    }

    Promise.all(playerPromises).then(() => {
        const data = {
            standings: standings.standings,
            scoreboard,
            stats: stats.stats,
            players
        };

        dataAccessor.saveDataToFile(data, {
            type: 'leagueData'
        });

        resolve(data);
    }, reject);
});

const getDataFromApi = () => {
    // const url = `${API.ESPN.HOST}/scoreboard?leagueId=${LEAGUE.ID}&seasonID=2017&matchupPeriodId=1`;
    // const url = `${API.ESPN.HOST}/players?playerId=12514`;
    // const url = 'http://games.espn.com/ffl/api/v2/standings?leagueId=' + leagueId + '&seasonId=2017';
    // const url = 'http://games.espn.com/ffl/api/v2/boxscore?leagueId=' + leagueId + '&teamId=' + teamId + '&scoringPeriodId=' + scoringPeriodId + '&seasonId=2017';
    // const url = `https://games.espn.com/ffl/api/v2/leagueSettings?leagueId=${leagueId}&seasonId=${seasonId}`;

    const url = `${API.ESPN.HOST}/rosterInfo?leagueId=${LEAGUE.ID}&seasonID=2017&teamIds=1`;
    return new Promise((resolve, reject) => {
        request(url, (err, response, body) => {
            if (!err) {
                resolve(body);
            } else {
                reject(err);
            }
        });
    });
};

module.exports = {
    getDataFromApi,
    getEspnData,
    getRankings
};

const espnData = require('espn-fantasy-football-data');
const dataAccessor = require('./dataAccessor');

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

module.exports = {
    getEspnData,
    getRankings
};

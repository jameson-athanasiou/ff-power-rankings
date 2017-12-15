const espnData = require('espn-fantasy-football-data');
const dataAccessor = require('./dataAccessor');

module.exports = {
    async getEspnData() {
        const standings = await espnData.getStandings();
        const scoreboard = await espnData.getScoreBoard();
        const stats = await espnData.getStats();

        const data = {
            standings: standings.standings,
            scoreboard,
            stats: stats.stats
        };

        dataAccessor.saveDataToFile(data, {
            type: 'leagueData'
        });

        return data;
    }
};

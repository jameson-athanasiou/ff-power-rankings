const espnData = require('espn-fantasy-football-data');

module.exports = {
    async getEspnData() {
        const standings = await espnData.getStandings();
        const scoreboard = await espnData.getScoreBoard();
        const stats = await espnData.getStats();

        return {
            standings,
            scoreboard,
            stats
        };
    }
};

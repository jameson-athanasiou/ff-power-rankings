// const espnData = require('espn-fantasy-football-data');
const dataAccessor = require('./dataAccessor');
const { LEAGUE } = require('./constants');
const request = require('request');
//
// const getRankings = async (week, position) => {
//     const data = await espnData.getPlayerRankings(week, position);
//     return data;
// };
//
// const getEspnData = async () => new Promise(async (resolve, reject) => {
//     const standings = await espnData.getStandings();
//     const scoreboard = await espnData.getScoreBoard();
//     const stats = await espnData.getStats();
//
//     const players = {};
//     const playerPromises = [];
//
//     for (let i = 1; i <= 12; i++) {
//         const promise = espnData.getPlayers(i);
//         playerPromises.push(promise);
//         promise.then((data) => {
//             players[`week${i}`] = data;
//         });
//     }
//
//     Promise.all(playerPromises).then(() => {
//         const data = {
//             standings: standings.standings,
//             scoreboard,
//             stats: stats.stats,
//             players
//         };
//
//         dataAccessor.saveDataToFile(data, {
//             type: 'leagueData'
//         });
//
//         resolve(data);
//     }, reject);
// });

const getLeagueSettings = () => new Promise((resolve, reject) => {
    const url = `https://games.espn.com/ffl/api/v2/leagueSettings?leagueId=${LEAGUE.ID}&seasonId=2017`;
    request(url, (err, response, body) => {
        if (err) {
            reject(err);
        } else {
            const data = JSON.parse(body);
            if (response.statusCode >= 400) {
                reject(data);
            } else {
                resolve(Object.values(data.leaguesettings.teams).map(team => ({
                    logoUrl: team.logoUrl,
                    abbreviation: team.teamAbbrev,
                    teamName: `${team.teamLocation} ${team.teamNickname}`,
                    teamId: team.teamId,
                    owner: `${team.owners[0].firstName} ${team.owners[0].lastName}`
                })));
            }
        }
    });
});

const getScoreboardApi = period => new Promise((resolve, reject) => {
    const url = `https://games.espn.com/ffl/api/v2/scoreboard?leagueId=${LEAGUE.ID}&seasonId=2017&matchupPeriodId=${period}`;
    request(url, (err, response, body) => {
        if (err) {
            reject(err);
        } else {
            const data = JSON.parse(body);
            if (response.statusCode >= 400) {
                reject(data);
            } else {
                resolve(data.scoreboard);
            }
        }
    });
});

const getStandingsApi = () => new Promise((resolve, reject) => {
    const url = `https://games.espn.com/ffl/api/v2/standings?leagueId=${LEAGUE.ID}&seasonId=2017`;
    request(url, (err, response, body) => {
        if (err) {
            reject(err);
        } else {
            const data = JSON.parse(body);
            if (response.statusCode >= 400) {
                reject(data);
            } else {
                resolve(data.teams);
            }
        }
    });
});

const getDataFromApi = async () => {
    // const leagueId = 211640;
    // const teamId = 1;
    // const scoringPeriodId = 1;
    // const matchupPeriodId = 1;
    // const seasonId = 2017;
    // const url = `${API.ESPN.HOST}/scoreboard?leagueId=${LEAGUE.ID}&seasonID=2017&matchupPeriodId=1`;
    // const url = 'http://games.espn.com/ffl/api/v2/standings?leagueId=' + leagueId + '&seasonId=2017';
    // const url = 'http://games.espn.com/ffl/api/v2/boxscore?leagueId=' + leagueId + '&teamId=' + teamId + '&scoringPeriodId=' + scoringPeriodId + '&seasonId=2017';
    // const url = `https://games.espn.com/ffl/api/v2/leagueSettings?leagueId=${leagueId}&seasonId=${seasonId}`;
    // const url = `${API.ESPN.HOST}/rosterInfo?leagueId=${LEAGUE.ID}&seasonID=2017&teamIds=1`;
    // http://games.espn.com/ffl/api/v2/recentActivity?leagueId=211640&count=20&rand=00921504334023
    // http://games.espn.com/ffl/api/v2/playerInfo?leagueId=211640&playerId=18026

    // const workingTestUrl = http://games.espn.com/ffl/api/v2/standings?leagueId=211640&seasonId=2017

    const retVal = {
        teams: await getLeagueSettings().catch(err => err),
        scoreboard: await getScoreboardApi(1).catch(err => err),
        standings: await getStandingsApi().catch(err => err)
    };
    return retVal;
};

module.exports = {
    getDataFromApi,
    getEspnData,
    getRankings
};

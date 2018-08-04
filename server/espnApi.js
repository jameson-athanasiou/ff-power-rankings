const { ESPN } = require('./constants');
const request = require('request');

const getLeagueSettings = season => new Promise((resolve, reject) => {
    const url = `https://games.espn.com/ffl/api/v2/leagueSettings?leagueId=${ESPN.LEAGUE.ID}&seasonId=${season}`;
    request(url, (err, response, body) => {
        if (err) {
            reject(err);
        } else {
            const data = JSON.parse(body);
            if (response.statusCode >= 400) {
                reject(data);
            } else {
                resolve(data);
            }
        }
    });
});

const getRoster = (team, week) => new Promise((resolve, reject) => {
    const url = `${ESPN.HOST}/rosterInfo?leagueId=${ESPN.LEAGUE.ID}&seasonId=2017&teamIds=${team}&scoringPeriodId=${week}`;
    request(url, (err, response, body) => {
        if (err) {
            const error = new Error('Error during request');
            error.code = 500;
            reject(error);
        } else if (response.statusCode >= 400) {
            const error = new Error('Error during request');
            error.code = 400;
            reject(error);
        } else {
            const data = JSON.parse(body);
            const { teams } = data.leagueRosters;
            if (teams.length === 1) {
                const { slots } = teams[0];
                const roster = slots.map(slot => slot.player);
                resolve(roster);
            } else {
                const error = new Error('Could not find roster');
                error.code = 404;
                reject(error);
            }
        }
    });
});

const getScoreboard = period => new Promise((resolve, reject) => {
    const url = `https://games.espn.com/ffl/api/v2/scoreboard?leagueId=${ESPN.LEAGUE.ID}&seasonId=2017&matchupPeriodId=${period}`;
    request(url, (err, response, body) => {
        if (err) {
            reject(err);
        } else {
            const data = JSON.parse(body);
            if (response.statusCode >= 400) {
                reject(data);
            } else {
                const { matchups } = data.scoreboard;
                const dataObject = {
                    scoreboard: [...matchups],
                    week: period
                };
                resolve(dataObject);
            }
        }
    });
});

const getStandings = () => new Promise((resolve, reject) => {
    const url = `https://games.espn.com/ffl/api/v2/standings?leagueId=${ESPN.LEAGUE.ID}&seasonId=2017`;
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

const getTeams = () => new Promise((resolve, reject) => {
    const url = `https://games.espn.com/ffl/api/v2/leagueSettings?leagueId=${ESPN.LEAGUE.ID}&seasonId=2017`;
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

module.exports = {
    getLeagueSettings,
    getRoster,
    getScoreboard,
    getStandings,
    getTeams
};

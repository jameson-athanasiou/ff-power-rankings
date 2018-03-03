const dataAccessor = require('./dataAccessor');

const writeTeamFile = data => new Promise((resolve, reject) => {
    const teams = {};
    data.forEach((team) => {
        teams[team.OWNER] = {
            name: team.TEAM
        };
    });

    dataAccessor.saveDataToFile(teams, {
        type: 'teams'
    }).then(resolve, reject);
});

const rankByPoints = (teams, stats) => new Promise((resolve) => {
    const ranking = stats.map(teamStats => ({
        owner: teamStats.OWNER,
        name: teamStats.TEAM,
        points: teamStats.PF
    }));

    resolve(ranking.sort((teamOne, teamTwo) => teamTwo.points - teamOne.points));
});

const rankByWins = (teams, stats) => new Promise((resolve) => {
    const ranking = stats.map((teamStats) => {
        const homeWins = teamStats.HOME.substring(0, 1);
        const awayWins = teamStats.AWAY.substring(0, 1);
        const wins = parseInt(homeWins, 10) + parseInt(awayWins, 10);

        return {
            owner: teamStats.OWNER,
            name: teamStats.TEAM,
            wins
        };
    });

    resolve(ranking.sort((teamOne, teamTwo) => teamTwo.wins - teamOne.wins));
});

const createOverallRankings = async (data) => {
    const rankGroups = {};
    const teams = await dataAccessor.getDataFromFile('teams');

    rankGroups.points = await rankByPoints(teams, data);
    rankGroups.wins = await rankByWins(teams, data);

    return rankGroups;
};
/*
const parseWeek = ({ scoreboard }) => {
    const rankingsObject = {};
    scoreboard.forEach((game) => {
        rankingsObject[game[0].owner] = {
            [game[0].owner]: game[0].owner,
            team: game[0].team,
            points: game[0].points,
            win: game[0].points > game[1].points
        };

        rankingsObject[game[1].owner] = {
            [game[1].owner]: game[1].owner,
            team: game[1].team,
            points: game[1].points,
            win: game[1].points > game[0].points
        };
    });

    return rankingsObject;
};

const createWeekOverWeekRankings = async (data) => {
    const rankGroups = {};
    // const teams = await dataAccessor.getDataFromFile('teams');
    rankGroups.weekOneData = parseWeek(data[0]);
    return rankGroups;
};
*/
const finalizePowerRankNumbers = (rankings) => {
    const finalRankings = [];
    Object.keys(rankings).forEach((key, i) => {
        rankings[key].forEach((team, j) => {
            if (!i) {
                const rankObject = {
                    owner: team.owner,
                    name: team.name,
                    averageRank: j + 1
                };
                finalRankings.push(rankObject);
            } else {
                const currentTeam = finalRankings.find(teamObj => teamObj.owner === team.owner);
                if (currentTeam) {
                    currentTeam.averageRank = (currentTeam.averageRank + j + 1) / (i + 1);
                }
            }
        });
    });

    return finalRankings;
};

const generatePowerRankings = data => new Promise((resolve, reject) => {
    writeTeamFile(data.stats).then(async () => {
        const rankings = await createOverallRankings(data.stats);
        // const rankings = await createWeekOverWeekRankings(data.scoreboard);
        const finalRankings = finalizePowerRankNumbers(rankings);

        resolve(finalRankings);
    }, reject);
});

module.exports = {
    generatePowerRankings
};

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

const rankByPoints = (weekStatsByTeam) => {
    const ranking = Object.keys(weekStatsByTeam).map(ownerName => ({
        owner: ownerName,
        name: weekStatsByTeam[ownerName].team,
        points: parseInt(weekStatsByTeam[ownerName].points, 10)
    }));

    return ranking.sort((teamOne, teamTwo) => teamTwo.points - teamOne.points);
};


const rankByWins = (weekStatsByTeam) => {
    const ranking = Object.keys(weekStatsByTeam).map(ownerName => ({
        owner: ownerName,
        name: weekStatsByTeam[ownerName].team,
        wins: weekStatsByTeam[ownerName].win ? 1 : 0,
        points: parseInt(weekStatsByTeam[ownerName].points, 10)
    }));

    return ranking.sort((teamOne, teamTwo) => {
        if (teamTwo.wins === teamOne.wins) {
            return teamTwo.points - teamOne.points;
        }

        return teamTwo.wins - teamOne.wins;
    });
};

const parseWeek = ({ scoreboard }) => {
    const rankingsObject = {};
    scoreboard.forEach((game) => {
        const firstTeamPoints = parseInt(game[0].points, 10);
        const secondTeamPoints = parseInt(game[1].points, 10);

        rankingsObject[game[0].owner] = {
            owner: game[0].owner,
            team: game[0].team,
            points: game[0].points,
            win: firstTeamPoints > secondTeamPoints
        };

        rankingsObject[game[1].owner] = {
            owner: game[1].owner,
            team: game[1].team,
            points: game[1].points,
            win: secondTeamPoints > firstTeamPoints
        };
    });

    return rankingsObject;
};

const createWeekOverWeekRankings = async (data) => {
    const rankGroups = {};
    data.forEach((week, i) => {
        rankGroups[i + 1] = parseWeek(week);
    });

    return rankGroups;
};

const getCombinedWeekRankings = (previousWeek, currentWeek, stat = 'points') => previousWeek.map((team) => {
    const matchedTeam = currentWeek.find(currentTeam => currentTeam.owner === team.owner);
    return {
        owner: team.owner,
        name: team.name,
        points: parseInt(team.points, 10) + parseInt(matchedTeam.points, 10),
        [stat]: parseInt(team[stat], 10) + parseInt(matchedTeam[stat], 10)
    };
}).sort((teamOne, teamTwo) => {
    if (stat === 'points' || (stat === 'wins' && (teamTwo.wins === teamOne.wins))) {
        return teamTwo.points - teamOne.points;
    }

    return teamTwo.wins - teamOne.wins;
});

const finalizeWeekToDateRankings = (data) => {
    const rankings = {
        points: {},
        wins: {}
    };
    for (let i = 1; i <= Object.keys(data).length; i++) {
        // run anaysis for week 1, then week 1 through week2, then, etc
        const week = data[i];
        const pointsRank = rankByPoints(week);
        rankings.points[i - 1] = i > 1 ? getCombinedWeekRankings(rankings.points[i - 2], pointsRank, 'points') : pointsRank;

        const winsRank = rankByWins(week);
        rankings.wins[i - 1] = i > 1 ? getCombinedWeekRankings(rankings.wins[i - 2], winsRank, 'wins') : winsRank;
    }

    return rankings;
};

const producePowerRankNumbers = (rankings) => {
    const powerRank = {};

    rankings.forEach((rankTypeObject) => {
        const rankTypeObjectKeys = Object.keys(rankTypeObject);

        rankTypeObjectKeys.forEach((key, jindex) => {
            rankTypeObject[key].forEach((team, kindex) => {
                if (!jindex) {
                    powerRank[team.owner] = 0;
                }
                const previousRank = powerRank[team.owner];
                powerRank[team.owner] = (previousRank + kindex + 1) / (jindex + 1);
            });
        });
    });

    return Object.freeze(powerRank);
};

const produceWeeklyPowerRankNumbers = (rankings) => {
    const rankingsObject = {};
    Object.keys(rankings).forEach((weekNumber) => {
        rankings[weekNumber].forEach((team, index) => {
            const { owner } = team;
            if (!rankingsObject[owner]) {
                rankingsObject[owner] = [];
            }

            rankingsObject[owner].push(index + 1);
        });
    });

    return rankingsObject;
};

const generatePowerRankings = data => new Promise((resolve, reject) => {
    writeTeamFile(data.stats).then(async () => {
        const rankings = await createWeekOverWeekRankings(data.scoreboard);
        const finalRankings = finalizeWeekToDateRankings(rankings);

        const arrayOfArrays = Object.keys(finalRankings).map(key => finalRankings[key]);
        const powerRankings = producePowerRankNumbers(arrayOfArrays);

        const weeklyNumbers = produceWeeklyPowerRankNumbers(arrayOfArrays[1]);

        resolve({
            rankings,
            finalRankings,
            arrayOfArrays,
            powerRankings,
            weeklyNumbers
        });
    }, reject);
});

module.exports = {
    generatePowerRankings
};

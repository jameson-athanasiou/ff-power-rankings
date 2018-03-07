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
//
// const overallRankByPoints = stats => new Promise((resolve) => {
//     const ranking = stats.map(teamStats => ({
//         owner: teamStats.OWNER,
//         name: teamStats.TEAM,
//         points: teamStats.PF
//     }));
//
//     resolve(ranking.sort((teamOne, teamTwo) => teamTwo.points - teamOne.points));
// });
//
// const overallRankByWins = stats => new Promise((resolve) => {
//     const ranking = stats.map((teamStats) => {
//         const homeWins = teamStats.HOME.substring(0, 1);
//         const awayWins = teamStats.AWAY.substring(0, 1);
//         const wins = parseInt(homeWins, 10) + parseInt(awayWins, 10);
//
//         return {
//             owner: teamStats.OWNER,
//             name: teamStats.TEAM,
//             wins
//         };
//     });
//
//     resolve(ranking.sort((teamOne, teamTwo) => teamTwo.wins - teamOne.wins));
// });
//
// const createOverallRankings = async (data) => {
//     const rankGroups = {};
//     const teams = await dataAccessor.getDataFromFile('teams');
//
//     rankGroups.points = await overallRankByPoints(data);
//     rankGroups.wins = await overallRankByWins(data);
//
//     return rankGroups;
// };

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
        wins: weekStatsByTeam[ownerName].win ? 1 : 0
    }));

    return ranking.sort((teamOne, teamTwo) => teamTwo.wins - teamOne.wins);
};

const parseWeek = ({ scoreboard }) => {
    const rankingsObject = {};
    scoreboard.forEach((game) => {
        rankingsObject[game[0].owner] = {
            owner: game[0].owner,
            team: game[0].team,
            points: game[0].points,
            win: game[0].points > game[1].points
        };

        rankingsObject[game[1].owner] = {
            owner: game[1].owner,
            team: game[1].team,
            points: game[1].points,
            win: game[1].points > game[0].points
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

// const combineWeekRankings = (weeksToCombine) => {
//     const combinedRankings = weeksToCombine[0];
//     weeksToCombine.forEach((week, i) => {
//         week.forEach((currentTeam) => {
//             if (i > 0) {
//                 const matchingTeam = combinedRankings.find(finalTeam => finalTeam.owner === currentTeam.owner);
//                 matchingTeam.points += parseInt(currentTeam.points, 10);
//             }
//         });
//     });
//
//     return combinedRankings.sort((teamOne, teamTwo) => teamTwo.points - teamOne.points);
// };

const getCombinedWeekRankings = (previousWeek, currentWeek, stat = 'points') => previousWeek.map((team) => {
    // TODO: something in here (or the method that calls this) is borking the total win numbers when combining weeks
    const matchedTeam = currentWeek.find(currentTeam => currentTeam.owner === team.owner);
    // if (matchedTeam.owner === 'Jameson Athanasiou' && stat === 'wins') {
    //     debugger;
    // }
    return {
        owner: team.owner,
        name: team.name,
        [stat]: parseInt(team[stat], 10) + parseInt(matchedTeam[stat], 10)
    };
}).sort((teamOne, teamTwo) => teamTwo[stat] - teamOne[stat]);

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
//
// const finalizePowerRankNumbers = (rankings) => {
//     const finalRankings = [];
//     Object.keys(rankings).forEach((key, i) => {
//         rankings[key].forEach((team, j) => {
//             if (!i) {
//                 const rankObject = {
//                     owner: team.owner,
//                     name: team.name,
//                     averageRank: j + 1
//                 };
//                 finalRankings.push(rankObject);
//             } else {
//                 const currentTeam = finalRankings.find(teamObj => teamObj.owner === team.owner);
//                 if (currentTeam) {
//                     currentTeam.averageRank = (currentTeam.averageRank + j + 1) / (i + 1);
//                 }
//             }
//         });
//     });
//
//     return finalRankings;
// };

const generatePowerRankings = data => new Promise((resolve, reject) => {
    writeTeamFile(data.stats).then(async () => {
        // const rankings = await createOverallRankings(data.stats);
        // const finalRankings = finalizePowerRankNumbers(rankings);

        const rankings = await createWeekOverWeekRankings(data.scoreboard);
        const finalRankings = finalizeWeekToDateRankings(rankings);
        // const combinedRankings = combineWeekRankings(arr);

        resolve(finalRankings);
    }, reject);
});

module.exports = {
    generatePowerRankings
};

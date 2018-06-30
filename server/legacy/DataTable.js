const dataAccessor = require('./dataAccessor');

class DataTable {
    constructor(type) {
        this.type = type;
        this.table = [];
    }

    addTeam(team) {
        this.table.push([team]);
        return this.getDataByTeam(team);
    }

    addTeams(teams) {
        teams.forEach((team) => {
            this.addTeam(team);
        });
    }

    addStatistics(team, stats) {
        const dataRow = this.getDataByTeam(team);
        stats.forEach((stat, i) => {
            dataRow[i + 1] = stat;
        });
    }

    getDataByTeam(team) {
        return this.table.find(teamRow => teamRow[0] === team);
    }

    getTable() {
        return this.table;
    }

    getOrCreateTeamDataRow(team) {
        return this.getDataByTeam(team) || this.addTeam(team);
    }

    initializeFromDataSet(dataSet) {
        switch (this.type) {
        case 'GameOutcomes':
            this.initializeGameOutcomesTable(dataSet);
            break;
        case 'PointsPerGame':
            this.initializePointsScoredTable(dataSet);
            break;
        default:
            throw new Error('Unknown table type. Cannot initialize');
        }
    }

    initializeGameOutcomesTable(dataSet) {
        dataSet.forEach(({ scoreboard }, index) => {
            scoreboard.forEach((game) => {
                const teamOne = game[0];
                const teamTwo = game[1];

                const teamOneRow = this.getOrCreateTeamDataRow(teamOne.owner);
                const teamTwoRow = this.getOrCreateTeamDataRow(teamTwo.owner);

                teamOneRow[index + 1] = parseInt(teamOne.points, 10) > parseInt(teamTwo.points, 10) ? 1 : 0;
                teamTwoRow[index + 1] = parseInt(teamTwo.points, 10) > parseInt(teamOne.points, 10) ? 1 : 0;
            });
        });
    }

    initializePointsScoredTable(dataSet) {
        dataSet.forEach(({ scoreboard }, index) => {
            scoreboard.forEach((game) => {
                game.forEach((team) => {
                    const row = this.getOrCreateTeamDataRow(team.owner);
                    row[index + 1] = team.points;
                });
            });
        });
    }

    writeTableToFile() {
        const fileName = `config/json/${this.type.replace(' ', '')}.json`;
        dataAccessor.saveDataToFile(this.table, {
            fileName
        });
    }
}

module.exports = DataTable;

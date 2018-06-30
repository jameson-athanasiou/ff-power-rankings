const fs = require('fs');

const fileMap = {
    leagueData: 'config/json/leagueData.json',
    teams: 'config/json/teams.json',
    powerRankings: 'config/json/powerRankingsData.json'
};

module.exports = {
    saveDataToFile(data, options) {
        const fileName = options.fileName || (options.type ? fileMap[options.type] : fileMap.powerRankings);
        return new Promise((resolve, reject) => {
            fs.writeFile(fileName, JSON.stringify(data), (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    },

    getDataFromFile(type) {
        const fileName = fileMap[type];
        return new Promise((resolve, reject) => {
            if (!fileName) {
                reject(new Error('File Not Found'));
            }

            fs.readFile(fileName, { encoding: 'utf-8' }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(data));
                }
            });
        });
    }
};

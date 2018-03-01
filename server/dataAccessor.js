const fs = require('fs');
const paths = require('../config/paths');

const fileMap = {
    leagueData: '/leagueData.json',
    powerRankings: '/powerRankingsData.json'
};

module.exports = {
    saveDataToFile(data, options) {
        const fileName = options.type ? fileMap[options.type] : fileMap.powerRankings;
        return new Promise((resolve, reject) => {
            fs.writeFile(paths.data + fileName, JSON.stringify(data), (err) => {
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

            fs.readFile(paths.data + fileName, { encoding: 'utf-8' }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(data));
                }
            });
        });
    }
};

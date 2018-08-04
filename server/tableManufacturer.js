const { getScoreboard } = require('./espnApi');

const scoreboardTable = async () => new Promise((resolve, reject) => {
    debugger;
    const promises = [];
    for (let i = 0; i < 16; i++) {
        promises.push(getScoreboard(i));
    }

    debugger;

    Promise.all(promises).then((data) => {
        debugger;
        resolve();
    }).catch((err) => {
        debugger;
        reject(err);
    });
});

module.exports = { scoreboardTable };

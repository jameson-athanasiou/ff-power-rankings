const mockDb = require('./mockDB');

module.exports.postPowerRankings = (request, response) => {
    request.on('data', (data) => {
        const payload = JSON.parse(data.toString());
        if (payload) {
            mockDb.storePowerRankings(payload);
            response.status(200).end();
        } else {
            response.status(500).end();
        }
    });
};

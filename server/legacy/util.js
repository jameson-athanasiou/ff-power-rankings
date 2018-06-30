const dataAccessor = require('./dataAccessor');

const getTeams = () => {
    dataAccessor.getDataFromFile('teams');
};

module.exports = {
    getTeams
};

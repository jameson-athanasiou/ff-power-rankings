
module.exports = {
  powerRankings: [],
  teams: [],

  getTeams() {
    return this.teams;
  },
  storeTeams(teams) {
    this.teams = teams;
  },
  getPowerRankings(week) {
    let returnValue = this.powerRankings;
    if (week) {
      returnValue = this.powerRankings.find(weekObj => weekObj.week === requestedWeek);
    }
    return returnValue;
  },
  storePowerRankings(data) {
    const teams = Object.keys(data).filter(key => key !== 'week');
    if (data.week && teams.length === 10) {
      this.powerRankings.push(data);
    }
  }
};

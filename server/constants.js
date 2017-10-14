module.exports = {
    DATABASE: {
        CONNECTION_STRING: 'mongodb://user:aX06k25aCVNTiDeN@cluster0-shard-00-00-p551f.mongodb.net:27017,cluster0-shard-00-01-p551f.mongodb.net:27017,cluster0-shard-00-02-p551f.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',
        NAME: {
            GAMES: 'Games',
            TEAMS: 'Teams'
        }
    },
    ESPN: {
        LEAGUE_ID: '211640',
        SEASON_ID: '2017',
        URL: {
            STANDINGS: 'http://games.espn.com/ffl/standings'
        }
    }
};

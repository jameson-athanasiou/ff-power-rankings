const assert = require('chai').assert;
const constants = require('../../../server/constants');
const MongoClient = require('mongodb').MongoClient;
const gameServer = require('../../../server/gameServer.js');
const sinon = require('sinon');

describe('gameServer tests', function () {

    const sandbox = sinon.createSandbox();
    const stubs = {};

    beforeEach(function() {
       stubs.connect = sandbox.stub(MongoClient, 'connect');
    });

    afterEach(function() {
        sandbox.restore();
    });

    it('When getting a game from the database Then the correct db conenction string should be used', function () {
        const request = {
            query: {
                week: '11'
            }
        };
        gameServer.getGame(request);
        assert.isTrue(stubs.connect.calledWith(constants.DATABASE.CONNECTION_STRING, sinon.match.any), 'connect was called with wrong connection string');
    });

    it('Given no week is passed with the request When getting a game from the database Then no db connection is made', function () {
        const request = {
            query: {
                week: null
            }
        };
        gameServer.getGame(request);
        assert.isFalse(stubs.connect.called, 'connect was called unexpectedly');
    });

});

import powerRankingsRequestor from 'src/requestor/powerRankingsRequestor';
import sinon from 'sinon';

describe('powerRankingsRequestor tests', function () {

    const sandbox = sinon.createSandbox();
    const stubs = {};

    beforeEach(function() {
        stubs.fetch = sandbox.stub(window, 'fetch').returns(Promise.resolve());
    });

    afterEach(function() {
        sandbox.restore();
    });

    it('When posting power rankings Then the correct endpoint is used', function() {
        powerRankingsRequestor.post();
        assert.isTrue(stubs.fetch.calledWith('/powerRankings', sinon.match.any), 'wrong endpoint used');
    });

    it('When posting power rankings Then fetch is called with the correct parameters', function() {
        const data = {
            team: 'testTeam'
        };
        powerRankingsRequestor.post(data);

        const fetchArgs = stubs.fetch.args[0][1];
        assert.equal(fetchArgs.method, 'post', 'method was not post');
        assert.equal(fetchArgs.body, JSON.stringify(data), 'data was not posted correctly');
    });
});

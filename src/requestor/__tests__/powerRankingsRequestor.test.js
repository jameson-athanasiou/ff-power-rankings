import assert from 'assert';
import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import powerRankingsRequestor from '../powerRankingsRequestor';

const sandbox = sinon.createSandbox();
const stubs = {};

const theDom = new jsdom('<div></div>');
const { window } = theDom;
global.window = window;

describe('Array', function() {
    beforeEach(()=> {

    });
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal([1,2,3].indexOf(4), -1);
        });

        it('When posting then the endpoint is /powerRankings', () => {
            stubs.fetch = sandbox.stub(window, 'fetch');
            powerRankingsRequestor.post();
            assert.equal(fetch.args[0][0], '/powerRankings');
        });

    });
});
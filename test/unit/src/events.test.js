import events from 'src/events';
import sinon from 'sinon';

describe('events tests', function () {

    const sandbox = sinon.createSandbox();
    const stubs = {};

    beforeEach(function() {

    });

    afterEach(function() {
        sandbox.restore();
    });

    it('should return -1 when the value is not present', function() {
         [1,2,3].indexOf(5).should.equal(-1);
         [1,2,3].indexOf(0).should.equal(-1);
    });
});

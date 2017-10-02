import Button from 'src/components/formComponents/Button';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import sinon from 'sinon';

describe('<Button /> tests', function () {

    chai.use(chaiEnzyme());

    const assert = chai.assert;
    const sandbox = sinon.createSandbox();
    const stubs = {};

    beforeEach(function() {

    });

    afterEach(function() {
        sandbox.restore();
    });

    it('When posting power rankings Then the correct endpoint is used', function() {
        powerRankingsRequestor.post();
        assert.isTrue(stubs.fetch.calledWith('/powerRankings', sinon.match.any), 'wrong endpoint used');
    });

});

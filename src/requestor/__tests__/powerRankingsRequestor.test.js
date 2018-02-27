import powerRankingsRequestor from '../powerRankingsRequestor';

test('When posting power rankings then the endpoint is correct', () => {
    window.fetch = jest.fn();

    powerRankingsRequestor.post();
    expect(window.fetch).toHaveBeenCalledWith('/powerRankings', expect.anything());
});
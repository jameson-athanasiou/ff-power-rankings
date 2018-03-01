import powerRankingsRequestor from '../powerRankingsRequestor';

test('When posting power rankings then the endpoint is correct', () => {
    window.fetch = jest.fn();

    powerRankingsRequestor.post();
    expect(window.fetch).toHaveBeenCalledWith('/powerRankings', expect.anything());
});

test('When posting power rankings then the data is passed correctly', () => {
    window.fetch = jest.fn();

    const data = {
        postData: 'yes'
    };

    const fetchObject = {
        method: 'post',
        body: JSON.stringify(data)
    };

    powerRankingsRequestor.post(data);
    expect(window.fetch.mock.calls[0][1]).toMatchObject(fetchObject);
});

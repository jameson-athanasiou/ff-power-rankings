export default {
    post(data) {
        fetch('/powerRankings', {
            method: 'post',
            body: JSON.stringify(data)
        });
    }
};

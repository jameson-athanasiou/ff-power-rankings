$('#sendTeam').on('click', () => {
    fetch('/team', {
        method: 'post',
        body: JSON.stringify({
            name: 'Team1',
            owner: 'ZackSack'
        })
    }).then(data => data.json()).then(data => {
        console.info('done posting team');
        console.info(data);
    });
});

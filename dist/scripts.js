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

$('#sendGame').on('click', () => {
    fetch('/game', {
        method: 'post',
        body: JSON.stringify({
            homeTeam: 'Zack',
            awayTeam: 'Matt',
            week: '1',
            homeTeamScore: 140,
            awayTeamScore: 150
        })
    }).then(data => data.json()).then(data => {
        console.info('done posting team');
        console.info(data);
    });
});



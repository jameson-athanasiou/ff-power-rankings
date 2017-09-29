import $ from 'jquery';

export default function () {
    $('#sendTeam').on('click', () => {
        fetch('/team', {
            method: 'post',
            body: JSON.stringify({
                name: 'Team1',
                owner: 'ZackSack'
            })
        }).then(data => data.json()).then(data => {

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

        });
    });

    $('#getGame').on('click', () => {
        const queryParams = 'week=1';
        fetch('/game?' + queryParams, {
            method: 'get'
        }).then(data => data.json()).then(data => {

        });
    });

}

import React from 'react';

export default class Standings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            standings: []
        };
    }

    generateView() {
        let viewData = <div>loading...</div>;
        if (!this.state.standings.length) {
            this.getStandings();
        }

        if (!this.state.loading && this.state.standings.length) {
            viewData = <ul>{this.state.standings.map(data => <li>data.team</li>)}</ul>;
        }

        return viewData;
    }

    getStandings() {
        return new Promise((resolve, reject) => {
            const { standings } = this.state;
            if (standings.length) {
                resolve(standings);
            } else {
                this.setState({
                    loading: true
                });

                fetch('/standings')
                    .then(data => data.json())
                    .then((jsonData) => {
                        this.setState({
                            standings: jsonData.standings
                        })
                        resolve(jsonData.standings);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }
        });
    }

    render() {
        return (
            <div className="standings">
                {this.generateView()}
            </div>
        );
    }
}

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Home from 'components/Home';
import RosPowerRankForm from 'components/forms/RosPowerRankForm';
import GoogleChartsOutput from 'components/output/GoogleChartsOutput';
import RosterStrengthForm from 'components/forms/RosterStrengthForm';
import Standings from 'components/output/Standings';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: []
        };

        fetch('/leagueSettings?season=2017').then(data => data.json()).then(({ leaguesettings }) => {
            this.setState({
                teams: leaguesettings.teams
            });
        });
    }

    static getEspnData() {
        fetch('/espnData');
    }

    static getDataFromFile() {
        fetch('/dataFromFile');
    }

    static runAnalysis() {
        fetch('/runAnalysis');
    }

    static getTables() {
        fetch('/tables');
    }

    RosterStrengthFormWithProps = props => (
        <RosterStrengthForm teams={this.state.teams} {...props} />
    );

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/RosPowerRankForm" component={RosPowerRankForm} />
                    <Route path="/GoogleChartsOutput" component={GoogleChartsOutput} />
                    <Route path="/RosterStrengthForm" component={this.RosterStrengthFormWithProps} />
                    <Route path="/Standings" component={Standings} />
                </Switch>

                <Button variant="raised" color="primary" onClick={Main.getEspnData}>Get ESPN Data</Button>
                <Button variant="raised" color="primary" onClick={Main.getDataFromFile}>Get File Data</Button>
                <Button variant="raised" color="primary" onClick={Main.runAnalysis}>Analyze!</Button>
                <Button variant="raised" color="primary" onClick={Main.getTables}>Tables!!</Button>
            </div>
        );
    }
}

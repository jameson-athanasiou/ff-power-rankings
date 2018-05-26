import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Home from 'components/Home';
import GameForm from 'components/forms/GameForm';
import ScoreInputForm from 'components/forms/ScoreInputForm';
import RosPowerRankForm from 'components/forms/RosPowerRankForm';
import GoogleChartsOutput from 'components/output/GoogleChartsOutput';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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

    render() {
        return (
            <main>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/GameForm" component={GameForm} />
                    <Route path="/ScoreInputForm" component={ScoreInputForm} />
                    <Route path="/RosPowerRankForm" component={RosPowerRankForm} />
                    <Route path="/GoogleChartsOutput" component={GoogleChartsOutput} />
                </Switch>

                <Button variant="raised" color="primary" onClick={Main.getEspnData}>Get ESPN Data</Button>
                <Button variant="raised" color="primary" onClick={Main.getDataFromFile}>Get File Data</Button>
                <Button variant="raised" color="primary" onClick={Main.runAnalysis}>Analyze!</Button>
                <Button variant="raised" color="primary" onClick={Main.getTables}>Tables!!</Button>
            </main>
        );
    }
}

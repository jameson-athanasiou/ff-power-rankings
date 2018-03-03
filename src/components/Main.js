import React from 'react';
import { Switch, Route } from 'react-router-dom';
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

                <button onClick={this.getEspnData}>Get ESPN Data</button>
                <button onClick={this.getDataFromFile}>Get File Data</button>
            </main>
        );
    }
}

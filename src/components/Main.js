import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from 'src/components/Home';
import GameForm from 'src/components/forms/GameForm';
import ScoreInputForm from 'src/components/forms/ScoreInputForm';
import RosPowerRankForm from 'src/components/forms/RosPowerRankForm';
import PowerRankingsOutput from 'src/components/output/PowerRankingsOutput';

export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    getEspnData() {
        fetch('/espnData');
    }

    getDataFromFile() {
        fetch('/dataFromFile');
    }

    render() {
        return  <main>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/GameForm' component={GameForm}/>
                        <Route path='/ScoreInputForm' component={ScoreInputForm}/>
                        <Route path='/RosPowerRankForm' component={RosPowerRankForm}/>
                        <Route path='/PowerRankingsOutput' component={PowerRankingsOutput}/>
                    </Switch>

                    <button onClick={this.getEspnData}>Get ESPN Data</button>
                    <button onClick={this.getDataFromFile}>Get File Data</button>
                </main>;
    }
}

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from 'src/components/Home';
import GameForm from 'src/components/forms/GameForm';
import RosPowerRankForm from 'src/components/forms/RosPowerRankForm';

export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return  <main>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/GameForm' component={GameForm}/>
                        <Route path='/RosPowerRankForm' component={RosPowerRankForm}/>
                    </Switch>
                </main>;
    }
}

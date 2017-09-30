import Button from 'src/components/formComponents/Button';
import React from 'react';
import LabelTextBox from 'src/components/formComponents/LabelTextBox';
import teams from 'json/teams';

export default class RosPowerRank extends React.Component {

    constructor(props) {
        super(props);
    }

    _mapTeams() {
        return teams.teams.map((team) => {
            return  <div key={team.owner}>
                        <LabelTextBox id={`team-${team.owner}`} labelText={`${team.owner} - ${team.name}`}/>
                    </div>
        });
    }

    render() {
        return  <div className='game-form'>
                    <LabelTextBox id='weekNumber' labelText='Week Number' />
                    {this._mapTeams()}
                    <Button text='Submit' />
                </div>
    }
}

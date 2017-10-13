import Button from 'src/components/formComponents/Button';
import React from 'react';
import LabelTextBox from 'src/components/formComponents/LabelTextBox';

export default class GameForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return  <div className='game-form'>
                    <LabelTextBox id='weekNumber' labelText='Week Number' />
                    <LabelTextBox id='homeTeam' labelText='Home Team' />
                    <LabelTextBox id='homeTeamScore' labelText='Home Team Score' />
                    <LabelTextBox id='awayTeam' labelText='Away Team' />
                    <LabelTextBox id='awayTeamScore' labelText='Away Team Score' />
                    <Button text='submit' />
                </div>
    }
}

import Button from 'components/formComponents/Button';
import React from 'react';
import LabelTextBox from 'components/formComponents/LabelTextBox';

export default class GameForm extends React.Component {
    static onClick() {
        fetch('/team');
    }

    render() {
        return (
            <div className="game-form">
                <button onClick={this.onClick}> get espn data </button>
                <LabelTextBox id="weekNumber" labelText="Week Number" />
                <LabelTextBox id="homeTeam" labelText="Home Team" />
                <LabelTextBox id="homeTeamScore" labelText="Home Team Score" />
                <LabelTextBox id="awayTeam" labelText="Away Team" />
                <LabelTextBox id="awayTeamScore" labelText="Away Team Score" />
                <Button text="submit" />
            </div>);
    }
}

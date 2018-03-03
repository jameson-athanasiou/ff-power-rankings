import React from 'react';
import LabelTextBox from 'components/formComponents/LabelTextBox';

export default () => (
    <div className="game-form">
        <button onClick={() => {
            window.fetch('/team');
        }}
        >get espn data
        </button>
        <LabelTextBox id="weekNumber" labelText="Week Number" />
        <LabelTextBox id="homeTeam" labelText="Home Team" />
        <LabelTextBox id="homeTeamScore" labelText="Home Team Score" />
        <LabelTextBox id="awayTeam" labelText="Away Team" />
        <LabelTextBox id="awayTeamScore" labelText="Away Team Score" />
        <button onClick={() => true}>submit</button>
    </div>
);

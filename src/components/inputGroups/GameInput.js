import LabelTextBox from 'components/formComponents/LabelTextBox';
import React from 'react';

export default () => (
    <div className="game-input">
        <LabelTextBox id={`score-${this.props.homeTeam}`} labelText={this.props.homeTeam} />
        <span>at</span>
        <LabelTextBox id={`score-${this.props.awayTeam}`} labelText={this.props.awayTeam} />
    </div>
);


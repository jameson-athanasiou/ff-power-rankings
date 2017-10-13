import Button from 'src/components/formComponents/Button';
import React from 'react';
import LabelTextBox from 'src/components/formComponents/LabelTextBox';

export default class GameInput extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return  <div className='game-input'>
                    <LabelTextBox id={`score-${this.props.homeTeam}`} labelText={this.props.homeTeam} />
                    <span>at</span>
                    <LabelTextBox id={`score-${this.props.awayTeam}`} labelText={this.props.awayTeam} />
                </div>
    }
}

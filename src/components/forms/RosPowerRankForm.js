import Button from 'src/components/formComponents/Button';
import React from 'react';
import LabelTextBox from 'src/components/formComponents/LabelTextBox';

export default class RosPowerRank extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return  <div className='game-form'>
                    <LabelTextBox id='weekNumber' labelText='Week Number' />
                    <LabelTextBox id='teamName' labelText='Team' />
                    <LabelTextBox id='RosPowerRank' labelText='Rest of Season Power Rank' />
                    <Button text='submit' />
                </div>
    }
}

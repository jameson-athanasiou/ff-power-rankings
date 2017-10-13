import Button from 'src/components/formComponents/Button';
import React from 'react';
import MatchupsForm from 'src/components/inputGroups/MatchupsForm';

export default class ScoreInputForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return  <div className='score-input'>
                    <MatchupsForm />
                    <Button text='Submit' />
                </div>
    }
}

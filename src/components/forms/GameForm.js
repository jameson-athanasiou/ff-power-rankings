import Button from 'src/components/formComponents/Button';
import React from 'react';
import TextBox from 'src/components/formComponents/TextBox';

export default class GameForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return  <div className="game-form">
                    <TextBox />
                    <Button />
                </div>
    }
}

import React from 'react';

export default class LabelTextBox extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return  <div>
                    <label htmlFor={this.props.id}>{this.props.labelText}</label>
                    <input type="textbox" id={this.props.id}></input>
                </div>
    }
}

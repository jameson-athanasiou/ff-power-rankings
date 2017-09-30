import React from 'react';

export default class Button extends React.Component {

    constructor(props) {
        super(props);
    }

    _handleClick() {
        this.props.onClick();
    }

    render() {
        return <button onClick={this._handleClick.bind(this)}>Send</button>;
    }
}

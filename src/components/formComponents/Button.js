import PropTypes from 'prop-types';
import React from 'react';

export default class Button extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick();
    }

    render() {
        return <button onClick={this.handleClick}>{this.props.text}</button>;
    }
}

Button.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string
};

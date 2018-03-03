import PropTypes from 'prop-types';
import React from 'react';

const button = ({ click, text }) => (
    <button onClick={click}>{text}</button>
);

export default button;

button.propTypes = {
    click: PropTypes.func,
    text: PropTypes.string
};

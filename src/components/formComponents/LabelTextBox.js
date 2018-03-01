import PropTypes from 'prop-types';
import React from 'react';

const LabelTextBox = ({ labelText, id }) => (
    <div>
        <label htmlFor={this.props.id}>{labelText}</label>
        <input type="textbox" id={id} onChange={this.props.onChange} />
    </div>
);

LabelTextBox.propTypes = {
    labelText: PropTypes.string,
    id: PropTypes.string
};

export default LabelTextBox;

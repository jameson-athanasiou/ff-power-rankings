import PropTypes from 'prop-types';
import React from 'react';

const LabelTextBox = ({ labelText, id, onChange }) => (
    <div>
        <label htmlFor={id}>{labelText}</label>
        <input type="textbox" id={id} onChange={onChange} />
    </div>
);

LabelTextBox.propTypes = {
    labelText: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func
};

export default LabelTextBox;

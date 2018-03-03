import { shallow } from 'enzyme';
import LabelTextBox from '../LabelTextBox';
import React from 'react';

describe('<LabelTextBox />', () => {
    test('renders an html label with the correct props', () => {
        const labelText = 'text';
        const wrapper = shallow(<LabelTextBox id="id" labelText={labelText} />);
        const label = wrapper.find('label');

        expect(label.length).toBe(1);
        expect(wrapper.text()).toContain(labelText);
        expect(label.props().htmlFor).toBe('id');
    });

    test('renders an html input with the correct props', () => {
        const onChangeCallback = jest.fn();
        const wrapper = shallow(<LabelTextBox id="id" onChange={onChangeCallback} />);
        const input = wrapper.find('input');
        const inputProps = input.props();

        expect(input.length).toBe(1);
        expect(inputProps.type).toBe('textbox');
        expect(inputProps.id).toBe('id');
        expect(inputProps.onChange).toBe(onChangeCallback);
    });
});

import { shallow } from 'enzyme';
import TextBox from '../TextBox';
import React from 'react';

describe('<TextBox />', () => {
    test('renders an html input with the correct props', () => {
        const wrapper = shallow(<TextBox />);
        const input = wrapper.find('input');
        const inputProps = input.props();

        expect(input.length).toBe(1);
        expect(inputProps.type).toBe('textbox');
    });
});

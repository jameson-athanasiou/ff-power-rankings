import { shallow, mount } from 'enzyme';
import GameForm from '../GameForm';
import React from 'react';

describe('<GameForm />', () => {
    test('renders a single div', () => {
        const wrapper = shallow(<GameForm />);

        expect(wrapper.find('div').length).toBe(1);
        expect(wrapper.find('.game-form').length).toBe(1);
    });

    test('renders buttons with the correct events', () => {
        window.fetch = jest.fn();

        const wrapper = mount(<GameForm />);
        const button = wrapper.find('button');

        expect(button.length).toBe(2);

        button.at(0).simulate('click');
        expect(window.fetch).toHaveBeenCalledWith('/team');
    });

    test('renders the correct label text box components', () => {
        const wrapper = mount(<GameForm />);
        const labelTextBoxes = wrapper.find('LabelTextBox');

        expect(labelTextBoxes.length).toBe(5);
    });
});


import { shallow } from 'enzyme';
import Header from '../Header';
import React from 'react';

describe('<Header />', () => {
    test('renders a header and nav html component', () => {
        const wrapper = shallow(<Header />);
        expect(wrapper.find('header').length).toBe(1);
        expect(wrapper.find('nav').length).toBe(1);
    });

    test('renders 2 unordered lists', () => {
        const wrapper = shallow(<Header />);
        expect(wrapper.find('ul').length).toBe(2);
    });

    test('renders correct Link components', () => {
        const wrapper = shallow(<Header />);
        expect(wrapper.find('Link').length).toBe(5);
    });
});


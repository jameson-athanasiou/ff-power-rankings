import { shallow } from 'enzyme';
import App from '../App';
import Header from '../Header';
import Main from '../Main';
import React from 'react';

describe('<App />', () => {
    test('renders a Header and Main component', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.contains(<Header />)).toBe(true);
        expect(wrapper.contains(<Main />)).toBe(true);
    });
});


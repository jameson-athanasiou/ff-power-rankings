import { shallow, mount } from 'enzyme';
import Home from '../Home';
import React from 'react';

describe('<Home />', () => {
    test('renders a simple div', () => {
        const wrapper = shallow(<Home />);
        expect(wrapper.find('div').length).toBe(1);
    });

    test('state is instantiated correctly', () => {
        const wrapper = mount(<Home />);
        expect(wrapper.state()).toMatchObject({});

        wrapper.unmount();
    });
});


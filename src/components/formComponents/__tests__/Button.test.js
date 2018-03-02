import { shallow } from 'enzyme';
import Button from '../Button';
import React from 'react';

describe('<Button />', () => {
    test('renders a button with the correct text', () => {
        const buttonText = 'buttonText';
        const wrapper = shallow(<Button text={buttonText} />);
        expect(wrapper.find('button').length).toBe(1);
        expect(wrapper.text()).toContain(buttonText);
    });

    test('when clicked then the click event is fired correctly', () => {
        const clickCallback = jest.fn();
        const wrapper = shallow(<Button onClick={clickCallback} />);
        wrapper.find('button').simulate('click');
        expect(clickCallback).toBeCalled();
    });

    test('when instantiated then the onclick callback is bound correctly', () => {
        Button.prototype.handleClick.bind = jest.fn();
        shallow(<Button />);
        expect(Button.prototype.handleClick.bind).toBeCalled();
    });
});


import { shallow } from 'enzyme';
import RosPowerRankForm from '../RosPowerRankForm';
import powerRankingsRequestor from 'requestor/powerRankingsRequestor';
import React from 'react';

describe('<RosPowerRankForm />', () => {
    test('renders a single div as a wrapper', () => {
        const wrapper = shallow(<RosPowerRankForm teams={[]} />);

        expect(wrapper.find('div').length).toBe(1);
        expect(wrapper.find('.ros-power-rank-form').length).toBe(1);
    });

    test('renders a label text box component', () => {
        const wrapper = shallow(<RosPowerRankForm teams={[]} />);

        expect(wrapper.find('LabelTextBox').length).toBe(1);
    });

    test('Given valid post data it renders a button with the correct events', () => {
        powerRankingsRequestor.post = jest.fn();
        const persistableState = {
            property: 'perist me!'
        };

        const wrapper = shallow(<RosPowerRankForm teams={[]} />);
        const button = wrapper.find('button');
        wrapper.setState({
            persistable: persistableState
        });

        expect(button.length).toBe(1);

        button.simulate('click');

        expect(powerRankingsRequestor.post).toHaveBeenCalledWith(persistableState);
    });

    test('Given invalid post data it renders a button with the correct events', () => {
        powerRankingsRequestor.post = jest.fn();
        RosPowerRankForm.validatePost = jest.fn(() => false);
        jest.mock(RosPowerRankForm.onSubmit);

        const wrapper = shallow(<RosPowerRankForm teams={[]} />);
        const button = wrapper.find('button');

        expect(button.length).toBe(1);

        expect(() => {
            button.simulate('click');
        }).toThrow('post data invalid');

        expect(powerRankingsRequestor.post).not.toBeCalled();
    });
});

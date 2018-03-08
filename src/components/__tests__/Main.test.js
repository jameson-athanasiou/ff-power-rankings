import { shallow } from 'enzyme';
import Main from '../Main';
import Home from '../Home';
import GameForm from 'components/forms/GameForm';
import ScoreInputForm from 'components/forms/ScoreInputForm';
import RosPowerRankForm from 'components/forms/RosPowerRankForm';
import GoogleChartsOutput from 'components/output/GoogleChartsOutput';
import React from 'react';

describe('<Main />', () => {
    test('state is instantiated correctly', () => {
        const wrapper = shallow(<Main />);
        expect(wrapper.state()).toMatchObject({});
    });

    test('renders a main html component', () => {
        const wrapper = shallow(<Main />);
        expect(wrapper.find('main').length).toBe(1);
    });

    test('renders a switch component', () => {
        const wrapper = shallow(<Main />);
        expect(wrapper.find('Switch').length).toBe(1);
    });

    test('renders all the necessary routes', () => {
        const wrapper = shallow(<Main />);
        expect(wrapper.find('Route').length).toBe(5);
    });

    test('Home route is constructed correctly', () => {
        const wrapper = shallow(<Main />);
        const routes = wrapper.find('Route');
        const routeZeroProps = routes.at(0).props();
        expect(routeZeroProps.path).toBe('/');
        expect(routeZeroProps.component).toBe(Home);
    });

    test('GameForm route is constructed correctly', () => {
        const wrapper = shallow(<Main />);
        const routes = wrapper.find('Route');
        const routeZeroProps = routes.at(1).props();
        expect(routeZeroProps.path).toBe('/GameForm');
        expect(routeZeroProps.component).toBe(GameForm);
    });

    test('ScoreInputForm route is constructed correctly', () => {
        const wrapper = shallow(<Main />);
        const routes = wrapper.find('Route');
        const routeZeroProps = routes.at(2).props();
        expect(routeZeroProps.path).toBe('/ScoreInputForm');
        expect(routeZeroProps.component).toBe(ScoreInputForm);
    });

    test('RosPowerRankForm route is constructed correctly', () => {
        const wrapper = shallow(<Main />);
        const routes = wrapper.find('Route');
        const routeZeroProps = routes.at(3).props();
        expect(routeZeroProps.path).toBe('/RosPowerRankForm');
        expect(routeZeroProps.component).toBe(RosPowerRankForm);
    });

    test('GoogleChartsOutput route is constructed correctly', () => {
        const wrapper = shallow(<Main />);
        const routes = wrapper.find('Route');
        const routeZeroProps = routes.at(4).props();
        expect(routeZeroProps.path).toBe('/GoogleChartsOutput');
        expect(routeZeroProps.component).toBe(GoogleChartsOutput);
    });

    test('getEspnData fetches the correct data', () => {
        window.fetch = jest.fn();
        Main.getEspnData();

        expect(window.fetch).toHaveBeenCalledWith('/espnData');
    });

    test('getDataFromFile fetches the correct data', () => {
        window.fetch = jest.fn();
        Main.getDataFromFile();

        expect(window.fetch).toHaveBeenCalledWith('/dataFromFile');
    });
});


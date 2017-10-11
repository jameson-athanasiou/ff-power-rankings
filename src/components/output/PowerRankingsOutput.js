import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries } from 'react-vis';
import React from 'react';
import powerRankingsData from 'json/mockData/powerRankings';

export default class PowerRankingsOutput extends React.Component {
    constructor(props) {
        super(props);
        console.info(powerRankingsData);
        this._formatDataForGraph(powerRankingsData);
    }

    _formatDataForGraph(data) {
        const owners = Object.keys(data[0]).filter(owner => owner !== 'week').map(owner => owner);
        debugger;
        const powerRankingsObject = {};
        owners.forEach(owner => {
            powerRankingsObject[owner] = [];
        });
        data.forEach(weekObject => {
            Object.keys(weekObject).forEach(owner => {
                owner !== 'week' && powerRankingsObject[owner].push({x: weekObject.week, y: weekObject[owner]});
            });
        });
        //return data.map

    }

    _generateLineSeries() {
        return <LineSeries data={this.props.data1} />
    }

    render() {
        //return <LineChart data1={[{x: 1, y: 10}, {x: 2, y: 5}, {x: 3, y: 15}]} data2={[{x: 1, y: 4}, {x: 2, y: 7}, {x: 3, y: 15}]} />
        return <XYPlot width={300} height={300}>
                    //{this._generateLineSeries.bind(this)};
                    <LineSeries data={[{x: 1, y: 10}, {x: 2, y: 5}, {x: 3, y: 15}]} />
                    <XAxis />
                    <YAxis />
                </XYPlot>
    }
};

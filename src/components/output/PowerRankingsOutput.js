import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries } from 'react-vis';
import React from 'react';
import powerRankingsData from 'json/mockData/powerRankings';
import 'style-loader!../../../node_modules/react-vis/dist/style.css';

export default class PowerRankingsOutput extends React.Component {
    constructor(props) {
        super(props);
        this._formatDataForGraph(powerRankingsData);
    }

    _formatDataForGraph() {
        const owners = Object.keys(powerRankingsData[0]).filter(owner => owner !== 'week').map(owner => owner);
        const powerRankingsObject = {};
        owners.forEach(owner => {
            powerRankingsObject[owner] = [];
        });
        powerRankingsData.forEach(weekObject => {
            Object.keys(weekObject).forEach(owner => {
                owner !== 'week' && powerRankingsObject[owner].push({x: weekObject.week, y: weekObject[owner]});
            });
        });

        return Object.keys(powerRankingsObject).map((series, i) => {
            return <LineSeries key={i} data={powerRankingsObject[series]} />
        });
    }

    _generateLineSeries() {
        return <LineSeries data={this.props.data1} />
    }

    render() {
        return <XYPlot width={300} height={300}>
                    {this._formatDataForGraph()}
                    <XAxis title="Week"/>
                    <YAxis title="Rank"/>
                </XYPlot>
    }
};

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import React from 'react';
import powerRankingsData from 'json/mockData/powerRankings';

export default class PowerRankingsOutput extends React.Component {
    constructor(props) {
        super(props);
        //this._formatDataForGraph(powerRankingsData);
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

    _getChartData() {
        return [
            {
                name: "Jim",
                week: 1,
                rank: 2
            },
            {
                name: "Jim",
                week: 2,
                rank: 1
            },
            {
                name: "Jim",
                week: 3,
                rank: 6
            },
            {
                name: "Jim",
                week: 4,
                rank: 5
            }
        ];
    }

    _generateLineSeries() {
        return <LineSeries data={this.props.data1} />
    }

    render() {
        return (
            <ResponsiveContainer height={600}>
                <LineChart data={this._getChartData()}>
                    <CartesianGrid />
                    <XAxis dataKey="week" />
                    <YAxis datayKey="rank" type="number" padding={{top: -59, bottom: -120}} ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} reversed/>
                    <Legend verticalAlign="top"/>
                    <Line dataKey="rank" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        )

    }
};

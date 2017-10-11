import { LineSeries } from 'react-vis';
import React from 'react';

export default class LineSeries extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //return <LineChart data={this.props.chartData} options={this.props.chartOptions} width="600" height="250"/>
        return  <LineSeries data={this.props.data} />
    }
};

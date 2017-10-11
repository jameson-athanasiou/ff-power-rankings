import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries } from 'react-vis';
import React from 'react';
import 'style-loader!../../../node_modules/react-vis/dist/style.css';

export default class LineChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //return <LineChart data={this.props.chartData} options={this.props.chartOptions} width="600" height="250"/>
        return  <XYPlot width={300} height={300}>
                    <LineSeries data={this.props.data1} />
                    <XAxis />
                    <YAxis />
                </XYPlot>
    }
};

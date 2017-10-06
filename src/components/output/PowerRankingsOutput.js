import { Line as LineChart } from 'react-chartjs';

export default class PowerRankingsOutput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <LineChart data={this.props.chartData} options={this.props.chartOptions} width="600" height="250"/>
    }
};
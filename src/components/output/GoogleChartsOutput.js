import React from 'react';
import powerRankingsData from 'json/mockData/powerRankings.json';

export default class GoogleChartsOutput extends React.Component {
    constructor(props) {
        super(props);

        this.rankingData = GoogleChartsOutput.formatDataForCharting();
        this.chart = null;

        window.google.charts.load('current', { packages: ['line'] });
        window.google.charts.setOnLoadCallback(() => {
            this.setupData();
            this.drawChart();
        });

        window.addEventListener('resize', () => {
            this.drawChart();
        });
    }

    componentWillUpdate() {
        this.drawChart();
    }

    static formatDataForCharting() {
        // const data = deepClone(leagueDataJson);
        // need power rank over time data. dont actually have that yet...
    }

    populateColumns(rankingData) {
        Object.keys(rankingData).forEach((key) => {
            this.chart.addColumn('number', key);
        });
    }

    populateRows(rankingData) {
        const rows = [];
        rankingData.forEach((dataObject) => {
            const row = [];
            Object.keys(dataObject).forEach((key) => {
                row.push(dataObject[key]);
            });
            rows.push(row);
        });

        this.chart.addRows(rows);
    }

    setupData() {
        this.chart = new window.google.visualization.DataTable();
        this.populateColumns(powerRankingsData[0]);
        this.populateRows(powerRankingsData);
    }

    drawChart() {
        const options = {
            chart: {
                title: 'Power Rank Over Time'
            }
        };

        const chart = new google.charts.Line(document.getElementById('linechart_material'));

        chart.draw(this.chart, google.charts.Line.convertOptions(options));
    }

    render() {
        return (
            <div
                id="linechart_material"
                style={{
                    minHeight: '200px',
                    height: '4em',
                    width: '100%'
                }}
            />
        );
    }
}

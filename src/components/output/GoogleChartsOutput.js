import React from 'react';
import powerRankingsData from 'json/mockData/powerRankings.json';

export default class PowerRankingsOutput extends React.Component {
    constructor(props) {
        super(props);

        this.rankingData = this.formatDataForCharting();

        window.google.charts.load('current', { packages: ['line'] });
        window.google.charts.setOnLoadCallback(this.drawChart.bind(this));
    }

    componentWillUpdate() {
        this.drawChart();
    }

    static formatDataForCharting() {
        // const data = deepClone(leagueDataJson);
        // need power rank over time data. dont actually have that yet...
    }

    static populateColumns(rankingData, chart) {
        Object.keys(rankingData).forEach((key) => {
            chart.addColumn('number', key);
        });
    }

    static populateRows(rankingData, chart) {
        const rows = [];
        rankingData.forEach((dataObject) => {
            const row = [];
            Object.keys(dataObject).forEach((key) => {
                row.push(dataObject[key]);
            });
            rows.push(row);
        });

        chart.addRows(rows);
    }

    drawChart() {
        const data = new window.google.visualization.DataTable();

        this.populateColumns(powerRankingsData[0], data);
        this.populateRows(powerRankingsData, data);

        const options = {
            chart: {
                title: 'Power Rank Over Time'
            },
            width: 900,
            height: 500
        };

        const chart = new google.charts.Line(document.getElementById('linechart_material'));

        chart.draw(data, google.charts.Line.convertOptions(options));
    }

    render() {
        return (
            <div id="linechart_material" />
        );
    }
}

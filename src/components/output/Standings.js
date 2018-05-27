import React from 'react';
import { Avatar, ExpansionPanel, ExpansionPanelSummary, LinearProgress, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import { merge } from 'lodash';

const styles = {
    progress: {
        'padding-top': '2em',
        'padding-bottom': '2em'
    },
    panelSummary: {
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        'padding-left': '10px'
    }
};

class Standings extends React.Component {
    state = {
        teamData: [],
        loading: true
    };

    componentDidMount() {
        const getStandings = new Promise((resolve, reject) => {
            fetch('/standings').then(data => data.json()).then(({ standings }) => {
                resolve(standings);
            }, reject);
        });

        const getStats = new Promise((resolve, reject) => {
            fetch('/stats').then(data => data.json()).then(({ stats }) => {
                resolve(stats);
            }, reject);
        });

        Promise.all([getStandings, getStats]).then((values) => {
            const standings = values[0];
            const stats = values[1];
            const teamData = standings.map((team, index) => merge(team, stats[index]));

            this.setState({
                teamData,
                loading: false
            });
        });
    }

    buildStandingsPanels() {
        const content = this.state.standings.map((team, index) => (
            <ExpansionPanel key={index + 1} defaultExpanded={!index}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Avatar>{index + 1}</Avatar><Typography className={this.props.classes.panelSummary}> {team.team} </Typography>
                </ExpansionPanelSummary>
            </ExpansionPanel>
        ));

        return <div> {content} </div>;
    }

    buildTable() {
        const table = (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Rank</TableCell>
                            <TableCell>Team</TableCell>
                            <TableCell>Wins</TableCell>
                            <TableCell>Losses</TableCell>
                            <TableCell>Games Behind</TableCell>
                            <TableCell>Points Scored</TableCell>
                            <TableCell>Points Allowed</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.teamData.map((team, index) => (
                            <TableRow key={index + 1} >
                                <TableCell>{index + 1 }</TableCell>
                                <TableCell>{team.team}</TableCell>
                                <TableCell>{team.wins}</TableCell>
                                <TableCell>{team.losses}</TableCell>
                                <TableCell>{team.gamesBehind}</TableCell>
                                <TableCell>{team.pointsScored}</TableCell>
                                <TableCell>{team.pointsAgainst}</TableCell>
                            </TableRow>
                        ))};
                    </TableBody>
                </Table>
            </Paper>
        );

        return table;
    }

    getLoadingContent = () => (
        <div className={this.props.classes.progress}>
            <LinearProgress />
            <br />
            <LinearProgress color="secondary" />
        </div>
    );

    render() {
        return this.state.loading ? this.getLoadingContent() : this.buildTable();
    }
}

Standings.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Standings);

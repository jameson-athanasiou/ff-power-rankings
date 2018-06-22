import React from 'react';
import {
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { POSITION_BY_SLOT_NUMBER } from 'maps/positionMaps';
import PropTypes from 'prop-types';

const styles = {
    formControl: {
        display: 'inline-block',
        padding: '10'
    },
    label: {
        position: 'relative',
        'margin-right': '10'
    },
    listItem: {
        'padding-top': '0',
        'padding-bottom': '0'
    },
    select: {
        position: 'relative',
        'margin-right': '20'
    }
};

class RosterStrengthForm extends React.Component {
    state = {
        year: '2017',
        week: '1',
        selectedTeamId: 1,
        roster: [],
        rosterLoading: true
    };

    componentDidMount() {
        this.getTeamRoster(1, 10).then(data => data.json()).then((roster) => {
            if (!roster.error) {
                this.setState({
                    roster,
                    rosterLoading: false
                });
            } else {
                console.error(roster.error);
            }
        });
    }

    getTeamRoster(teamId, week) {
        return fetch(`/roster?team=${teamId}&week=${week}`);
    }

    onSelectChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => {
            this.getTeamRoster(this.state.selectedTeamId, this.state.week)
                .then(data => data.json()).then((roster) => {
                    if (!roster.error) {
                        this.setState({
                            roster,
                            rosterLoading: false
                        });
                    } else {
                        console.error(roster.error);
                    }
                });
        });
    };

    createTeamSelect = () => {
        const { teams = [] } = this.props;
        return teams.map(({ teamLocation, teamNickname, teamId }, index) => {
            const teamName = `${teamLocation} ${teamNickname}`;
            return (
                <MenuItem value={teamId} key={index}>{teamName}</MenuItem>
            );
        });
    };

    createWeekSelect = () => {
        const weeks = [];
        for (let i = 1; i <= 17; i++) {
            weeks.push(i.toString());
        }

        return weeks.map((week, index) => <MenuItem value={week} key={index}>{week}</MenuItem>);
    };

    buildRosterContent() {
        const { roster } = this.state;
        const { classes } = this.props;

        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Position</TableCell>
                            <TableCell>Player</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {roster.filter(player => !!player).map((player, index) => (
                            <TableRow className={classes.listItem} key={index}>
                                <TableCell>{`${POSITION_BY_SLOT_NUMBER[index]}`}</TableCell>
                                <TableCell>{`${player.firstName} ${player.lastName}`}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <form>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="year-select" className={classes.label}>Season</InputLabel>
                        <Select
                            value={this.state.year}
                            inputProps={{
                                name: 'year',
                                id: 'year-select'
                            }}
                            onChange={this.onSelectChange}
                            className={classes.select}
                        >
                            {['2017', '2018'].map((year, index) => <MenuItem value={year} key={index}>{year}</MenuItem>)}
                        </Select>
                        <InputLabel htmlFor="week-select" className={classes.label}>Week</InputLabel>
                        <Select
                            value={this.state.week}
                            inputProps={{
                                name: 'week',
                                id: 'week-select'
                            }}
                            onChange={this.onSelectChange}
                            className={classes.select}
                        >
                            {this.createWeekSelect()}
                        </Select>
                        <InputLabel htmlFor="team-select" className={classes.label}>Team</InputLabel>
                        <Select
                            value={this.state.selectedTeamId}
                            inputProps={{
                                name: 'selectedTeamId',
                                id: 'team-select'
                            }}
                            onChange={this.onSelectChange}
                            className={classes.select}
                        >
                            {this.createTeamSelect()}
                        </Select>
                    </FormControl>
                </form>
                {this.state.rosterLoading ?
                    <CircularProgress /> :
                    this.buildRosterContent()
                }
            </div>
        );
    }
}

RosterStrengthForm.propTypes = {
    classes: PropTypes.object.isRequired,
    teams: PropTypes.array.isRequired
};

export default withStyles(styles)(RosterStrengthForm);

import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
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
    select: {
        position: 'relative',
        'margin-right': '20'
    }
};

class RosterStrengthForm extends React.Component {
    state = {
        year: '2017',
        week: '1'
    };

    onSelectChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    createWeekSelect = () => {
        const weeks = [];
        for (let i = 1; i <= 17; i++) {
            weeks.push(i.toString());
        }

        return weeks.map((week, index) => <MenuItem value={week} key={index}>{week}</MenuItem>);
    };

    render() {
        const { classes } = this.props;

        return (
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
                </FormControl>
            </form>
        );
    }
}

RosterStrengthForm.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RosterStrengthForm);

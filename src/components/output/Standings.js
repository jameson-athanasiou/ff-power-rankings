import React from 'react';
import { Avatar, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, LinearProgress, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class Standings extends React.Component {
    state = {
        standings: [],
        loading: true
    };

    componentDidMount() {
        fetch('/standings').then(data => data.json()).then(({ standings }) => {
            this.setState({
                standings,
                loading: false
            });
        });
    }

    buildStandingsPanels() {
        const content = this.state.standings.map((team, index) => (
            <ExpansionPanel key={index + 1} defaultExpanded={!index}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Avatar>{index + 1}</Avatar><Typography> {team.team} </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                       wins: {team.wins}
                       losses: {team.losses}
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        ));

        return <div> {content} </div>;
    }

    getLoadingContent = () => (
        <div>
            <LinearProgress />
            <br />
            <LinearProgress color="secondary" />
        </div>
    );

    render() {
        return this.state.loading ? this.getLoadingContent() : this.buildStandingsPanels();
    }
}

export default Standings;

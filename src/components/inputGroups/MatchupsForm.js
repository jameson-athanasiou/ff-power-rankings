import React from 'react';
import GameInput from 'components/inputGroups/GameInput';
import schedule from 'json/schedule.json';
import PropTypes from 'prop-types';

export default class MatchupsForm extends React.Component {
    mapSchedule() {
        let returnValue = <div />;
        const { weekNumber } = this.props;
        const currentWeek = schedule[`week${weekNumber}`];
        if (currentWeek && currentWeek.matchups) {
            returnValue = currentWeek.matchups.map((game, index) => <GameInput key={`matchup-${index}`} homeTeam={game.homeTeam} awayTeam={game.awayTeam} />);
        }

        return returnValue;
    }

    render() {
        return (
            <div className="matchups">
                {this.mapSchedule()}
            </div>
        );
    }
}

MatchupsForm.propTypes = {
    weekNumber: PropTypes.number
};


MatchupsForm.defaultProps = {
    weekNumber: 1
};

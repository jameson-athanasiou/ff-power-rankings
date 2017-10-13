import Button from 'src/components/formComponents/Button';
import React from 'react';
import GameInput from 'src/components/inputGroups/GameInput';
import LabelTextBox from 'src/components/formComponents/LabelTextBox';
import schedule from 'json/schedule';

export default class MatchupsForm extends React.Component {

    constructor(props) {
        super(props);
    }

    _mapSchedule() {
        let returnValue = <div></div>;
        const weekNumber = this.props.weekNumber || 1;
        const currentWeek = schedule[`week${weekNumber}`];
        if (currentWeek && currentWeek.matchups) {
            returnValue = currentWeek.matchups.map((game, index) => {
                return <GameInput key={`matchup-${index}`} homeTeam={game.homeTeam} awayTeam={game.awayTeam} />
            });
        }

        return returnValue;
    }

    render() {
        return  <div className='matchups'>
                    {this._mapSchedule()}
                </div>
    }
}

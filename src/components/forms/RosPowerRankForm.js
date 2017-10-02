import Button from 'src/components/formComponents/Button';
import React from 'react';
import LabelTextBox from 'src/components/formComponents/LabelTextBox';
import powerRankingsRequestor from 'src/requestor/powerRankingsRequestor';
import teams from 'json/teams';

export default class RosPowerRank extends React.Component {

    constructor(props) {
        super(props);
    }

    _onChange(owner, e) {
        this.setState({
            postData: {
                [owner]: e.target.value
            }
        });
    }

    _onSubmit() {
        const postData = this.state.postData;
        if (this._validatePost(postData)) {
            powerRankingsRequestor.post(this.state.postData);
        } else {
            //throw err
        }
    }

    _mapTeams() {
        return teams.teams.map((team) => {
            return <LabelTextBox key={team.owner} id={`team-${team.owner}`} ref={team.owner} labelText={`${team.owner} - ${team.name}`} onChange={this._onChange.bind(this, team.owner)} />
        });
    }

    _validatePost(data) {
        return true;
    }

    render() {
        return  <div className='game-form'>
                    <LabelTextBox id='weekNumber' labelText='Week Number' />
                    {this._mapTeams()}
                    <Button text='Submit' onClick={this._onSubmit.bind(this)}/>
                </div>
    }
}

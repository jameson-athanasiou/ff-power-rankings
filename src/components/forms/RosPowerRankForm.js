import Button from 'components/formComponents/Button';
import React from 'react';
import LabelTextBox from 'components/formComponents/LabelTextBox';
import powerRankingsRequestor from 'requestor/powerRankingsRequestor';
import teams from 'json/teams.json';

export default class RosPowerRank extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.bindClassMethods();
    }

    bindClassMethods() {
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(param, e) {
        this.setState({
            [param]: e.target.value
        });
    }

    onSubmit() {
        if (this.validatePost(this.state)) {
            powerRankingsRequestor.post(this.state);
        } else {
            // throw err
        }
    }

    mapTeams() {
        return teams.teams.map(team => (
            <LabelTextBox
                key={team.owner}
                id={`team-${team.owner}`}
                ref={team.owner}
                labelText={`${team.owner} - ${team.name}`}
                onChange={(e) => {
                    this.onChange(team.owner, e);
                }}
            />
        ));
    }

    static validatePost() {
        return true;
    }

    render() {
        return (
            <div className="game-form">
                <LabelTextBox
                    id="weekNumber"
                    labelText="Week Number"
                    onChange={(e) => {
                        this.onChange('week', e);
                    }}
                />
                {this.mapTeams()}
                <Button text="Submit" onClick={this.onSubmit} />
            </div>
        );
    }
}

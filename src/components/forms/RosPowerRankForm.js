import React from 'react';
import LabelTextBox from 'components/formComponents/LabelTextBox';
import powerRankingsRequestor from 'requestor/powerRankingsRequestor';
import PropTypes from 'prop-types';

export default class RosPowerRankForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            persistable: {},
            teams: this.props.teams || []
        };
        this.bindClassMethods();
    }

    bindClassMethods() {
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(param, e) {
        const currentPersistable = this.state.persistable;
        const newPersistable = {
            [param]: e.target.value
        };
        this.setState({
            persistable: Object.assign(currentPersistable, ...newPersistable)
        });
    }

    onSubmit() {
        if (RosPowerRankForm.validatePost(this.state.persistable)) {
            powerRankingsRequestor.post(this.state.persistable);
        } else {
            throw new Error('post data invalid');
        }
    }

    mapTeams() {
        return this.state.teams.map(team => (
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
            <div className="ros-power-rank-form">
                <LabelTextBox
                    id="weekNumber"
                    labelText="Week Number"
                    onChange={(e) => {
                        this.onChange('week', e);
                    }}
                />
                {this.mapTeams()}
                <button onClick={this.onSubmit}>Submit</button>
            </div>
        );
    }
}

RosPowerRankForm.propTypes = {
    teams: PropTypes.array
};

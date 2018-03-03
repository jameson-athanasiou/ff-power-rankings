import Button from 'components/formComponents/Button';
import React from 'react';
import MatchupsForm from 'components/inputGroups/MatchupsForm';

export default () => (
    <div className="score-input">
        <MatchupsForm />
        <Button text="Submit" />
    </div>
);

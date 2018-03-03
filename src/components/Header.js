import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <header>
        <nav>
            <ul>
                <li><Link to="/" href="/">Home</Link></li>
                <li><Link to="/gameform" href="/gameform">Input Game</Link></li>
                <li><Link to="/ScoreInputForm" href="/ScoreInputForm">Input Scores</Link></li>
                <li><Link to="/RosPowerRankForm" href="/RosPowerRankForm">Input Power Rankings</Link></li>
            </ul>
            <ul>
                <li><Link to="/GoogleChartsOutput" href="/GoogleChartsOutput">Power Rankings Chart</Link></li>
            </ul>
        </nav>
    </header>
);


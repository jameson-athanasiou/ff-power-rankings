import React from 'react';
import { Link } from 'react-router-dom'

export default class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return  <header>
                    <nav>
                        <ul>
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/gameform'>Input Game</Link></li>
                            <li><Link to='/RosPowerRankForm'>Input Power Rankings</Link></li>
                        </ul>
                    </nav>
                </header>
    }
}

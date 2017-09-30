import React from 'react';
import { Link } from 'react-router-dom'
import GameForm from 'src/components/forms/GameForm';

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
                        </ul>
                    </nav>
                </header>
    }
}

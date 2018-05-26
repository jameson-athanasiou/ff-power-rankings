import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

class SimpleMenu extends React.Component {
    state = {
        anchorEl: null
    };

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;

        return (
            <div>
                <IconButton
                    color="inherit"
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <nav>
                        <MenuItem onClick={this.handleClose}><Link to="/" href="/">Home</Link></MenuItem>
                        <MenuItem onClick={this.handleClose}><Link to="/gameform" href="/gameform">Input Game</Link></MenuItem>
                        <MenuItem onClick={this.handleClose}><Link to="/ScoreInputForm" href="/ScoreInputForm">Input Scores</Link></MenuItem>
                        <MenuItem onClick={this.handleClose}><Link to="/RosPowerRankForm" href="/RosPowerRankForm">Input Power Rankings</Link></MenuItem>
                        <MenuItem onClick={this.handleClose}><Link to="/GoogleChartsOutput" href="/GoogleChartsOutput">Power Rankings Chart</Link></MenuItem>
                    </nav>
                </Menu>
            </div>
        );
    }
}

export default SimpleMenu;

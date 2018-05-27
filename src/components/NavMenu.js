import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton, MenuItem, Drawer } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

class NavMenu extends React.Component {
    state = {
        open: false
    };

    toggleDrawer = () => {
        this.setState({
            open: !this.state.open
        });
    };

    render() {
        return (
            <div>
                <IconButton
                    color="inherit"
                    aria-haspopup="true"
                    onClick={this.toggleDrawer}
                >
                    <MenuIcon />
                </IconButton>
                <Drawer anchor="left" open={this.state.open} onClose={this.toggleDrawer}>
                    <nav>
                        <MenuItem onClick={this.toggleDrawer}><Link to="/" href="/">Home</Link></MenuItem>
                        <MenuItem onClick={this.toggleDrawer}><Link to="/gameform" href="/gameform">Input Game</Link></MenuItem>
                        <MenuItem onClick={this.toggleDrawer}><Link to="/ScoreInputForm" href="/ScoreInputForm">Input Scores</Link></MenuItem>
                        <MenuItem onClick={this.toggleDrawer}><Link to="/RosPowerRankForm" href="/RosPowerRankForm">Input Power Rankings</Link></MenuItem>
                        <MenuItem onClick={this.toggleDrawer}><Link to="/GoogleChartsOutput" href="/GoogleChartsOutput">Power Rankings Chart</Link></MenuItem>
                        <MenuItem onClick={this.toggleDrawer}><Link to="/Standings" href="/Standings">Standings</Link></MenuItem>
                    </nav>
                </Drawer>
            </div>
        );
    }
}

export default NavMenu;

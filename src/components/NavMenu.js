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
                        <Link to="/" href="/"><MenuItem onClick={this.toggleDrawer}>Home</MenuItem></Link>
                        <Link to="/RosPowerRankForm" href="/RosPowerRankForm"><MenuItem onClick={this.toggleDrawer}>Input Power Rankings</MenuItem></Link>
                        <Link to="/GoogleChartsOutput" href="/GoogleChartsOutput"><MenuItem onClick={this.toggleDrawer}>Power Rankings Chart</MenuItem></Link>
                        <Link to="/RosterStrengthForm" href="/RosterStrengthForm"><MenuItem onClick={this.toggleDrawer}>Input Roster Strength</MenuItem></Link>
                        <Link to="/Standings" href="/Standings"><MenuItem onClick={this.toggleDrawer}>Standings</MenuItem></Link>
                    </nav>
                </Drawer>
            </div>
        );
    }
}

export default NavMenu;

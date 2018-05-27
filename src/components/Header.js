import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import NavMenu from 'components/NavMenu';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    title: {
        'padding-left': '2em'
    }
};

export default withStyles(styles)(({ classes }) => (
    <header>
        <AppBar position="static">
            <Toolbar>
                <NavMenu />
                <Typography variant="title" color="inherit" className={classes.title}>
                    JOHN MADDEN!!!!
                </Typography>
            </Toolbar>
        </AppBar>
    </header>
));


import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import HeaderMenu from 'components/HeaderMenu';

export default () => (
    <header>
        <AppBar position="static">
            <Toolbar>
                <HeaderMenu />
                <Typography variant="title" color="inherit">
                    JOHN MADDEN!!!!
                </Typography>
            </Toolbar>
        </AppBar>
    </header>
);


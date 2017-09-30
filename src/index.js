import React from 'react';
import { render } from 'react-dom';
import App from 'src/App';
import { Router, Route, HashRouter } from 'react-router-dom'

render((
    <HashRouter>
        <App />
    </HashRouter>
), document.getElementById('root'));

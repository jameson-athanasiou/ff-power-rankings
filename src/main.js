import events from './events';
import HomePage from 'src/components/HomePage';
import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
//import router from 'src/router'; // eslint-disable-line no-unused-vars

events();

ReactDOM.render(
    <HomePage />,
    document.getElementById('root')
);

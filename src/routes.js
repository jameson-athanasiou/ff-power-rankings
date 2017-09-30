import GameForm from 'src/components/forms/GameForm';
import HomePage from 'src/components/HomePage';
import React from 'react';
import {BrowserRouter as Router, Route, Link, IndexRoute} from 'react-router-dom';

export default (
  <Route path="/" component={HomePage}>
    <Route path="GameForm" component={GameForm} />
  </Route>
);

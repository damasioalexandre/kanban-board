import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './layouts/App';
import Board from './components/board/Board';
import Backlog from './components/backlog/BacklogList'

import './index.css';

let destination = document.querySelector("#root");

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>

        </Route>
    </Router>,
    destination
);


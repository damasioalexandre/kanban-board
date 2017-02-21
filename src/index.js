import React from 'react';
import ReactDOM from 'react-dom';
import App from './layouts/App';
import './index.css';

ReactDOM.render(
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="stuff" component={Stuff} />
            <Route path="contact" component={Contact} />
        </Route>
    </Router>,
    destination
);


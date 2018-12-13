import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import CatalogBox from './catalogBox.js';
import ItemEdit from './itemEdit.js';

import '../css/base.css';

ReactDOM.render((
        <Router history={browserHistory}>
            <Route path="/" component={CatalogBox}/>
            <Route path="/:id" component={ItemEdit}/>
        </Router>
    ), document.getElementById('content')
);

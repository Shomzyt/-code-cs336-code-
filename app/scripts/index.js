import { Router, Route, browserHistory } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';

import CommentEdit from './CommentEdit';
import CommentBox from './CommentBox';
import '../css/base.css';

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path='/' component={CommentBox}/>
		<Route path='/:id' component={CommentEdit}/>
	</Router>
  ), document.getElementById('content')
);
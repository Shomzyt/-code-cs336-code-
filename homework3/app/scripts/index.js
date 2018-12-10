import React from 'react';
import ReactDOM from 'react-dom';

import PeopleBox from './PeopleBox';
import '../css/base.css';

ReactDOM.render(
  <PeopleBox url="/people" pollInterval={2000} />,
  document.getElementById('content')
);
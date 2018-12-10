import React from 'react';

import Person from './Person';
import '../css/base.css';

module.exports =  React.createClass({
  render: function() {
    var personNodes = this.props.data.map(function(person) {
      return (
        <Person firstName={person.firstName} lastName={person.lastName} startDate={person.startDate} years={person.years} />
      );
    });
    return (
      <div className="personList">
        {personNodes}
      </div>
    );
  }
});
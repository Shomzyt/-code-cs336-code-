import React from 'react';
import '../css/base.css';

module.exports = React.createClass({
  render: function() {
    return (
      <div className="person">
        <h2 className="personName">
          {this.props.firstName} {this.props.lastName}
        </h2>
        <p className="startDate">
          Start Date: {this.props.startDate}<br></br>
          Years Worked: {this.props.years}
        </p>
      </div>
    );
  }
});
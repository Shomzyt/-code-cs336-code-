import React from 'react';

import '../css/base.css';
module.exports =  React.createClass({
  getInitialState: function() {
    return {firstName: '', lastName: '', startDate: ''};
  },
  handleFirstNameChange: function(e) {
    this.setState({firstName: e.target.value});
  },
  handleLastNameChange: function(e) {
    this.setState({lastName: e.target.value});
  },
  handleStartDateChange: function(e) {
    this.setState({startDate: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var firstName = this.state.firstName.trim();
    var lastName = this.state.lastName.trim();
    var startDate = this.state.startDate;
    if (!firstName || !lastName || !startDate) {
      return;
    }
    this.props.onPersonSubmit({firstName: firstName, lastName: lastName, startDate: startDate});
    this.setState({firstName: '', lastName: '', startDate: ''});
  },
  render: function() {
    return (
      <div id="formHolder">
        <h3>Add new person:</h3>
        <form className="personForm" onSubmit={this.handleSubmit}>
          <div id="inputElements">
            <div className="leftSide">
              First Name:<br/>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={this.handleFirstNameChange}
              /><br/>
              Last Name:<br/>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={this.handleLastNameChange}
              /><br/>
            </div>
            <div className="rightSide">
              Start Date:<br/>
              <input
                type="date"
                name="startDate"
                value={this.state.startDate}
                onChange={this.handleStartDateChange}
              />
            </div>
          </div>
          <input type="submit" value="Post"/>
        </form>
      </div>
    );
  }
});
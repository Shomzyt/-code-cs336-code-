import React from 'react';

module.exports = React.createClass({
  getInitialState: function() {
    return {name: '', category:'', origin: '', description: '', manufacturer: '',
            manufactureDate: '', significance: ''};
  },
  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleCategoryChange: function(e) {
    this.setState({category: e.target.value});
  },
  handleOriginChange: function(e) {
    this.setState({origin: e.target.value});
  },
  handleDescriptionChange: function(e) {
    this.setState({description: e.target.value});
  },
  handleManufacturerChange: function(e) {
    this.setState({manufacturer: e.target.value});
  },
  handleDateChange: function(e) {
    this.setState({manufactureDate: e.target.value});
  },
  handleSignificanceChange: function(e) {
    this.setState({significance: e.target.value});
  },
  handleSubmit: function(e) {
  e.preventDefault();
  var name = this.state.name.trim();
  var category = this.state.category.trim();
  var origin = this.state.origin.trim();
  var description = this.state.description.trim();
  var manufacturer = this.state.manufacturer.trim();
  var manufactureDate = this.state.manufactureDate.trim();
  var significance = this.state.significance.trim();
  if (!name || !category) {
    return;
  }
  this.props.onItemSubmit({name: name, category: category, origin: origin,
                          description: description, manufacturer: manufacturer,
                          manufactureDate: manufactureDate, significance: significance});
  this.setState({name: '', category:'', origin: '', description: '', manufacturer: '',
                manufactureDate: '', significance: ''});
  },
  render: function() {
    return (
      <form className="catalogForm" onSubmit={this.handleSubmit}>
      <input
        type="text"
        placeholder="Item Name"
        value={this.state.name}
        onChange={this.handleNameChange}
      />
      <input
        type="text"
        placeholder="Category"
        value={this.state.category}
        onChange={this.handleCategoryChange}
      />
      <input
        type="text"
        placeholder="Origin"
        value={this.state.origin}
        onChange={this.handleOriginChange}
      />
      <input
        type="text"
        placeholder="Description"
        value={this.state.description}
        onChange={this.handleDescriptionChange}
      />
      <input
        type="text"
        placeholder="Manufacturer"
        value={this.state.manufacturer}
        onChange={this.handleManufacturerChange}
      />
      <input
        type="text"
        placeholder="Manufacture Date"
        value={this.state.manufactureDate}
        onChange={this.handleDateChange}
      />
      <input
        type="text"
        placeholder="Item Significance"
        value={this.state.significance}
        onChange={this.handleSignificanceChange}
      />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

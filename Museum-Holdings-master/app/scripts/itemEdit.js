import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';

import {API_URL} from './global';

module.exports = React.createClass({
    getInitialState: function () {
        return {author: '', text: ''};
    },
    componentDidMount: function () {
        this.loadData();
    },
    componentDidUpdate: function (prevProps) {
        if (this.props.params.id != prevProps.params.id) {
            this.loadData();
        }
    },
    loadData: function () {
        $.ajax({
            url: API_URL + "/" + this.props.params.id,
            dataType: 'json',
            cache: false,
        })
            .done(function (result) {
                this.setState(result[0]);
            }.bind(this))
            .fail(function (xhr, status, errorThrown) {
                console.error(API_URL, status, errorThrown.toString());
            }.bind(this));
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
    contextTypes: {
        router: React.PropTypes.object
    },
    handleUpdate: function () {
        var updatedItem = {
            author: this.state.author.trim(),
            text: this.state.text.trim(),
            name: this.state.name.trim(),
            category: this.state.category.trim(),
            origin: this.state.origin.trim(),
            description: this.state.description.trim(),
            manufacturer: this.state.manufacturer.trim(),
            manufactureDate: this.state.manufactureDate.trim(),
            significance: this.state.significance.trim()
        };
        $.ajax({
            url: API_URL + "/" + this.props.params.id,
            dataType: 'json',
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedItem)
        })
            .done(function (items) {
                this.context.router.push('/');
            }.bind(this))
            .fail(function (xhr, status, errorThrown) {
                console.error(API_URL, status, errorThrown.toString());
            }.bind(this));
    },
    handleDelete: function () {
        $.ajax({
            url: API_URL + "/" + this.props.params.id,
            type: 'DELETE',
        })
            .done(function (items) {
                this.context.router.push('/');
            }.bind(this))
            .fail(function (xhr, status, errorThrown) {
                console.error(API_URL, status, errorThrown.toString());
            }.bind(this));
    },
    render: function () {
        return (
            <div>
                <form className="catelogForm">
                    <h1>Item Edit - {this.props.params.id}</h1>
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
                    <button type="button" onClick={this.handleUpdate}>Update
                    </button>
                    <button type="button" onClick={this.handleDelete}>Delete
                    </button>
                </form>
                <Link to='/'>Cancel</Link>
            </div>
        );
    }
});

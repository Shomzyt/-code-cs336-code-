import React from 'react';
import $ from 'jquery';

import CatalogList from './catalogList';
import CatalogForm from './catalogForm';
import { API_URL, POLL_INTERVAL } from './global';

module.exports = React.createClass({
    getInitialState: function() {
        return {data: [], _isMounted: false};
    },
    loadItemsFromServer: function() {
        if (this.state._isMounted) {
            $.ajax({
                url: API_URL,
                dataType: 'json',
                cache: false,
            })
                .done(function (result) {
                    this.setState({data: result});
                }.bind(this))
                .fail(function (xhr, status, errorThrown) {
                    console.error(API_URL, status, errorThrown.toString());
                }.bind(this));
        }
    },
    handleItemsSubmit: function(item) {
        var items = this.state.data;
        item.id = Date.now();
        var newItems = items.concat([item]);
        this.setState({data: newItems});
        $.ajax({
            url: API_URL,
            dataType: 'json',
            type: 'POST',
            data: item,
        })
         .done(function(result){
             this.setState({data: result});
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             this.setState({data: items});
             console.error(API_URL, status, errorThrown.toString());
         }.bind(this));
    },
    componentDidMount: function() {
        this.state._isMounted = true;
        this.loadItemsFromServer();
        setInterval(this.loadItemsFromServer, POLL_INTERVAL);
    },
    componentWillUnmount: function() {
        // Reset the isMounted flag so that the loadCommentsFromServer callback
        // stops requesting state updates when the commentList has been unmounted.
        // This switch is optional, but it gets rid of the warning triggered by
        // setting state on an unmounted component.
        // See https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
        this.state._isMounted = false;
    },
    render: function() {
        return (
            <div className="catalogBox">
                <h1>Museum Catalog</h1>
                <CatalogList data={this.state.data} />
                <CatalogForm onObjectSubmit={this.handleObjectSubmit} />
            </div>
        );
    }
});

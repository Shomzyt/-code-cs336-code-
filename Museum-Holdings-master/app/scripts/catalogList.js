import React from 'react';
import Item from './item.js';

// tutorial2.js
module.exports = React.createClass({
  render: function() {
    var itemNodes = this.props.data.map(function(item) {
      return (
        <Item id={item.id} name={item.name} key={item.id}>
          {item.category}
          {item.origin}
          {item.description}
          {item.manufacturer}
          {item.age}
          {item.significance}
        </Item>
      );
    });
    return (
      <div className="catalogList">
        {itemNodes}
      </div>
    );
  }
});

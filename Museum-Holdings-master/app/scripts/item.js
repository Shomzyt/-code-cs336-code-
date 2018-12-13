import React from 'react';
import Remarkable from 'remarkable';
import {Link} from 'react-router';

// tutorial4.js
module.exports = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },
  render: function() {
    return (
      <div className="item">
        <h2 className="itemName">
          {this.props.name}
        </h2>
        <h3 className="itemCategory">
          {this.props.category}
        </h3>
        <h4 className="itemOrigin">
          {this.props.origin}
        </h4>
        <h5 className="itemDescription">
          {this.props.description}
        </h5>
        <h6 className="itemManufacturer">
          {this.props.manufacturer}
        </h6>
        <h7 className="itemAge">
          {this.props.age}
        </h7>
        <h8 className="itemSignificance">
          {this.props.significance}
        </h8>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
        <Link to={'/' + this.props.id}>Edit</Link>
      </div>
    );
  }
});

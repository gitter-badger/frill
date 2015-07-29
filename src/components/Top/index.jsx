'use strict';

// import Frill from 'frill';
import React from 'react';
// import path from 'path';

module.exports = React.createClass({
  name: "Top",
  mixins: [
    Frill.Mixin(React),
    Frill.StoreWatchMixin(["Test"])
  ],

  getInitialState: function () {
      return {};
  },

  getStateFromFrill: function () {
    return {
      count: this.getFrill().store("Test").getCount()
    }
  },

  onClick: function () {
    this.getFrill().action("Test").countUp()
  },

  onSock: function () {
    this.getFrill().action("Test").socketEmitter("MESSAGE SET IN COMPONENT")
  },

  render: function() {
    return (
      <div>
        this is Top component<br />
        <h4>{this.state.count}</h4>
          <button onClick={this.onClick}>click!</button>
          <button onClick={this.onSock}>socket!</button>
      </div>
    );
  }
});

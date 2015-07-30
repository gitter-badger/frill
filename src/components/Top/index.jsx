'use strict';
import React from 'react';
// import ReactMixin from 'react-mixin';
// import {Mixin, StoreWatchMixin} from '../../bootstrap';

export default class Top extends React.Component {

  constructor() {
    super();

    // this.state = {
    //   count: 0
    // };
  }

  static contextTypes() {
    return {
      frill: React.PropTypes.object
    };
  }

  static childContextTypes() {
    return {
      frill: React.PropTypes.object
    };
  }

  getStateFromFrill() {
    return {
      count: this.getFrill().store('Test').getCount()
    };
  }

  onClick(e) {
    this.getFrill().action('Test').countUp();
  }

  onSock() {
    this.getFrill().action('Test').socketEmitter('MESSAGE SET IN COMPONENT');
  }

  render() {
    return (
      <div>
        this is Top component<br />
        <h4>{this.state.count}</h4>
          <button onClick={this.onClick}>click!</button>
          <button onClick={this.onSock}>socket!</button>
      </div>
    );
  }
}

// ReactMixin(Top.prototype, Mixin(React));
// ReactMixin(Top.prototype, StoreWatchMixin(['test']));

import React from 'react';
import {BaseComponent, StoreWatchComponent} from '../../bootstrap';

class Top extends new StoreWatchComponent(['Test']) {

  constructor(props) {
    super(props);

    this._bind([
      'onClick',
      'onSock',
    ]);
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
    // this.getFrill().action('Test').socketEmitter('MESSAGE SET IN COMPONENT');
  }

  render() {
    return (
      <div>
        This is Top component<br />
        <h4>{this.state.count}</h4>
          <button onClick={this.onClick}>click!</button>
          <button onClick={this.onSock}>socket!</button>
      </div>
    );
  }
}

export default Top;

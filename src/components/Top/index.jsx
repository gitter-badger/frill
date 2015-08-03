import React from 'react';
import {BaseComponent, StoreWatchComponent} from '../../bootstrap';

class Top extends new StoreWatchComponent(['Test']) {

  constructor(props) {
    super(props);

    this._bind([
      'onOne',
      'onTen',
    ]);
  }

  getStateFromFrill() {
    return {
      count: this.getFrill().store('Test').getCount()
    };
  }

  onOne(e) {
  this.getFrill().action('Test').countUp();
  }

  onTen(e) {
    this.getFrill().action('Test').countUpBy(10);
  }

  render() {
    return (
      <div>
        <h2>FrillJS</h2>
        <h4>{this.state.count}</h4>
          <button onClick={this.onOne}>+1</button>
          <button onClick={this.onTen}>+10</button>
      </div>
    );
  }
}

export default Top;

import React from 'react';
import {StoreWatchComponent} from '../../bootstrap';

class Top extends new StoreWatchComponent(['Test']) {

  constructor(props) {
    super(props);

    this._bind([
      'onOne',
      'onTen',
    ]);
  }

  onOne() {
    this.getFrill().action('Test').countUp();
  }

  onTen() {
    this.getFrill().action('Test').countUpBy(10);
  }

  getStateFromFrill() {
    return {
      count: this.getFrill().store('Test').getCount(),
    };
  }

  render() {
    return (
      <div className="Top">
        <h2>Sample Counter</h2>
        <h4>{this.state.count}</h4>
          <button onClick={this.onOne}>+1</button>
          <button onClick={this.onTen}>+10</button>
      </div>
    );
  }
}

export default Top;

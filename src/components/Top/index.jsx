import React from 'react';
import {StoreWatchComponent} from '../../bootstrap';
import ScrollBlock from '../ScrollBlock';

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
        <h2>Samples</h2>
        <section>
          <h3>Button - counter</h3>
          <p className="count">{this.state.count}</p>
          <button onClick={this.onOne}>+1</button>
          <button onClick={this.onTen}>+10</button>
        </section>
        <section>
          <h3>Textarea</h3>
          <textarea placeholder="type something ..."></textarea>
        </section>
        <section>
          <h3>Infinite Scroll</h3>
          <ScrollBlock
            onScrolledToBottom={this.loadItem} />
        </section>
      </div>
    );
  }
  
  loadItem() {
    console.log('scroll reached!');
  }
}

export default Top;

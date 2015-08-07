import React from 'react';
import {StoreWatchComponent} from '../../bootstrap';
import ScrollBlock from '../ScrollBlock';

class Top extends new StoreWatchComponent(['Test']) {

  constructor(props) {
    super(props);

    this._bind([
      'onOne',
      'onTen',
      'loadScrollItems',
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
      scrollItems: this.getFrill().store('Test').getScrollItems(),
      scrollItemsCount: this.getFrill().store('Test').getScrollItemsCount(),
    };
  }

  render() {
    const items = [];

    this.state.scrollItems.map((item) => {
      items.push(
        <li key={item.id}>
          <p>ID : {item.id}</p>
          <p>title : {item.title}</p>
        </li>
      );
    });

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
            fetchData={this.loadScrollItems}
            itemsCount={this.state.scrollItemsCount}>
              <h4>Scroll down the box ...</h4>
              <ul className="scroll-list">
                {items}
              </ul>
          </ScrollBlock>
        </section>
      </div>
    );
  }

  loadScrollItems() {
    this.getFrill()
      .action('Test')
      .loadScrollItems(this.state.scrollItemsCount, 5);
  }
}

export default Top;

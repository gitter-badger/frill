import React from 'react';
import {StoreWatchComponent} from '../../bootstrap';
import ScrollBlock from '../ScrollBlock';

class Top extends new StoreWatchComponent(['Example']) {

  constructor(props) {
    super(props);

    this._bind([
      'onOne',
      'onTen',
      'onLoadScrollItems',
    ]);
  }

  onOne() {
    this.getFrill().action('Example').countUp();
  }

  onTen() {
    this.getFrill().action('Example').countUpBy(10);
  }

  onLoadScrollItems() {
    this.getFrill()
      .action('Example')
      .loadScrollItems(this.state.scrollItemsCount, 5);
  }

  getStateFromFrill() {
    return {
      count: this.getFrill().store('Example').getCount(),
      scrollItems: this.getFrill().store('Example').getScrollItems(),
      scrollItemsCount: this.getFrill().store('Example').getScrollItemsCount(),
      scrollItemTotal: this.getFrill().store('Example').getScrollItemTotal(),
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
            fetchData={this.onLoadScrollItems}
            itemsCount={this.state.scrollItemsCount}
            itemTotal={this.state.scrollItemTotal}>
              <h4>Scroll down the box ...</h4>
              <ul className="scroll-list">
                {items}
              </ul>
          </ScrollBlock>
        </section>
      </div>
    );
  }
}

export default Top;

import React from 'react';
import {StoreWatchComponent} from 'frill-core';
import ScrollBlock from '../ScrollBlock/index.jsx';

/**
 * Top component
 * @extends {FrillCore.StoreWatchComponent}
 * @example <caption>Usage in React-Router</caption>
 * <Route name="login" path="/login" handler={LoginComponent} />
 */
class TopComponent extends new StoreWatchComponent(['Example']) {

  /**
   * Constructor
   * @param {any} props
   */
  constructor(props) {
    super(props);

    this._bind([
      'onOne',
      'onTen',
      'onFetchItems',
    ]);
  }

  /**
   * Count up by one
   */
  onOne() {
    this.getFrill().action('Example').countUp();
  }

  /**
   * Count up by ten
   */
  onTen() {
    this.getFrill().action('Example').countUpBy(10);
  }

  /**
   * Fetch items
   */
  onFetchItems() {
    this.getFrill()
      .action('Example')
      .loadScrollItems(this.state.scrollItemsCount, 5);
  }

  /**
   * getStateFromFrill
   * @listens {ExampleStore}
   */
  getStateFromFrill() {
    return {
      count: this.getFrill().store('Example').count,
      scrollItems: this.getFrill().store('Example').scrollItems,
      scrollItemsCount: this.getFrill().store('Example').scrollItemsCount,
      scrollItemTotal: this.getFrill().store('Example').scrollItemTotal,
    };
  }

  /**
   * render
   * @return {React DOM}
   * @see https://facebook.github.io/react/docs/component-specs.html#render
   */
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
        <h2>Examples</h2>
        <section>
          <h3>Button - counter</h3>
          <p className="count">{this.state.count}</p>
          <button onClick={this.onOne}>+1</button>
          <button onClick={this.onTen}>+10</button>
        </section>
        <section>
          <h3>Infinite Scroll</h3>
          <ScrollBlock
            fetchData={this.onFetchItems}
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

/**
 * Export TomComponent
 */
export default TopComponent;

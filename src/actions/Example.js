import {BaseAction} from 'frill-core';
import scrollData from '../helpers/testScrollItemsData';

/**
 * Example actions
 * @extends {FrillCore.BaseAction}
 * @example <caption>via react or frill component</caption>
 * // count up counters
 * this.getFrill().action('Example').countUp();
 * // count up counters by a number given
 * this.getFrill().action('Example').countUpBy(10);
 * // load items by scroll
 * this.getFrill().action('Example').loadScrollItems(1, 5);
 */
class ExampleAction extends BaseAction {

  /**
   * Constructor
   */
  constructor() {
    super();
    // this.use('request', {prefix: '/api'});
    // this.use('socket', {url: 'http://localhost:3000'});
  }

  /**
   * Counts up counter by one.
   * @emits {COUNT_UP}
   */
  countUp() {
    this.dispatch('COUNT_UP');
  }

  /**
   * Counts up counter by a number given.
   * @param {number} [count=1] - a number to count up by
   * @emits {COUNT_UP_BY}
   */
  countUpBy(count = 1) {
    this.dispatch('COUNT_UP_BY', count);
  }

  /**
   * load items by scroll (Infinite scrolling)
   * @param {number} [lastIndex=1] - the last index of items loaded
   * @param {number} [retrieve=5] - number of items to load
   * @emits {LOAD_SCROLL_ITEMS}
   */
  loadScrollItems(lastIndex = 1, retrieve = 5) {
    const data = scrollData.slice(lastIndex, lastIndex + retrieve);
    setTimeout(() => {
      this.dispatch('LOAD_SCROLL_ITEMS', {
        data: data,
        total: scrollData.length,
      });
    }, 1500);
  }
}

/**
 * export ExampleAction instance
 */
export default new ExampleAction();

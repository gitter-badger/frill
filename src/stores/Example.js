import {BaseStore} from 'frill-core';

/**
 * Example store
 * @extends {FrillCore.BaseStore}
 * @example <caption>via frill component</caption>
 * this.getFrill().store('Example').getCount(); // get count
 * @example <caption>via frill action</caption>
 * this.dispatch('COUNT_UP_BY', 15); // count up counter by 15
 */
class ExampleStore extends BaseStore {

  /**
   * Constructor
   */
  constructor() {
    super();
    this._count = 0;
    this._scrollItems = [];
    this._scrollItemsCount = 0;
    this._scrollItemTotal = 0;

    /**
     * Actions to listen
     * @param {Object} actions
     * @listens {COUNT_UP}
     * @listens {COUNT_UP_BY}
     * @listens {LOAD_SCROLL_ITEMS}
     */
    this.actions = {
      'COUNT_UP': 'countUp',
      'COUNT_UP_BY': 'countUpBy',
      'LOAD_SCROLL_ITEMS': 'loadScrollItems',
    };
  }

  /**
   * Count up by 1
   * @emits {change}
   */
  countUp() {
    this._count = this._count + 1;
    this.change();
  }

  /**
   * Count up by a number given
   * @param {number} byCount - a number to count up by
   * @emits {change}
   */
  countUpBy(byCount) {
    this._count = this._count + byCount;
    this.change();
  }

  /**
   * Gets current count
   * @type {number}
   */
  get count() {
    return this._count;
  }

  /**
   * Load scroll items
   * @param {Object} payload.data - data of items
   * @param {Object} payload.total - total count of items
   * @emits {change}
   */
  loadScrollItems({data, total}) {
    this._scrollItems = this._scrollItems.concat(data);
    this._scrollItemsCount = this._scrollItemsCount + data.length;
    this._scrollItemTotal = total;
    this.change();
  }

  /**
   * Gets items
   * @type {Object}
   */
  get scrollItems() {
    return this._scrollItems;
  }

  /**
   * Gets loaded items count
   * @type {number}
   */
  get scrollItemsCount() {
    return this._scrollItemsCount;
  }

  /**
   * Gets total count of items
   * @return {number} - get number of total items
   */
  get scrollItemTotal() {
    return this._scrollItemTotal;
  }
}

/**
 * Export ExampleStore instance
 */
export default new ExampleStore();

import {Store} from 'frill-core';

class TestStore extends Store {

  constructor() {
    super();
    this._count = 10;
    this._scrollItems = [];
    this._scrollItemsCount = 0;
    this.actions = {
      'COUNT_UP': 'countup',
      'COUNT_UP_BY': 'countupBy',
      'LOAD_SCROLL_ITEMS': 'loadScrollItems',
    };
  }

  countup() {
    this._count = this._count + 1;
    this.change();
  }

  countupBy(byCount) {
    this._count = this._count + byCount;
    this.change();
  }

  getCount() {
    return this._count;
  }

  loadScrollItems(data) {
    this._scrollItems = this._scrollItems.concat(data);
    this._scrollItemsCount = this._scrollItemsCount + data.length;
    this.change();
  }

  getScrollItems() {
    return this._scrollItems;
  }

  getScrollItemsCount() {
    return this._scrollItemsCount;
  }

}

export default new TestStore();

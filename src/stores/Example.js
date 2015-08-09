import {BaseStore} from 'frill-core';

class ExampleStore extends BaseStore {

  constructor() {
    super();
    this._count = 0;
    this._scrollItems = [];
    this._scrollItemsCount = 0;
    this._scrollItemTotal = 0;
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

  loadScrollItems({data, total}) {
    this._scrollItems = this._scrollItems.concat(data);
    this._scrollItemsCount = this._scrollItemsCount + data.length;
    this._scrollItemTotal = total;
    this.change();
  }

  getScrollItems() {
    return this._scrollItems;
  }

  getScrollItemsCount() {
    return this._scrollItemsCount;
  }

  getScrollItemTotal() {
    return this._scrollItemTotal;
  }

}

export default new ExampleStore();

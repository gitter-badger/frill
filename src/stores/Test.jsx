import Frill from '../core';

class TestStore extends Frill.Store {

  constructor() {
    super();
    this._count = 1;
    this.actions = {
      "COUNT_UP": "countup",
      "COUNT_UP_BY": "countupBy"
    };
  }

  countup(payload) {
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

}

export default new TestStore();

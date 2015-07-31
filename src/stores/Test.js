import Frill from '../core';

/* @flow */
class TestStore extends Frill.Store {

  constructor() {
    super();
    this._count = 10;
    this.actions = {
      "COUNT_UP": "countup",
      "COUNT_UP_BY": "countupBy"
    };
  }

  countup(payload: any) {
    this._count = this._count + 1;
    this.change();
  }

  countupBy(byCount: number) {
    this._count = this._count + byCount;
    this.change();
  }

  getCount(): number {
    return this._count;
  }

}

export default new TestStore();

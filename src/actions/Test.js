import Frill from '../core';

/* @flow */
class TestAction extends Frill.Action {

  constructor() {
    super();
    this.use('request', {prefix: '/api'});
    // this.use('socket', {url: 'http://localhost:3000'});
  }

  countUp() {
    this.request.prefix.get('/v1/hello', (err, ret) => console.log(ret.text));
    this.dispatch("COUNT_UP");
  }

  countUpBy(count: number) {
    this.dispatch("COUNT_UP_BY", count);
  }
}

export default new TestAction();

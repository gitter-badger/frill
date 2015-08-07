import {Action} from 'frill-core';

class TestAction extends Action {

  constructor() {
    super();
    this.use('request', {prefix: '/api'});
    // this.use('socket', {url: 'http://localhost:3000'});
  }

  countUp() {
    console.log('counting up');
    console.log(this.frill.store('Auth'));
    this.dispatch('COUNT_UP');
  }

  countUpBy(count) {
    this.dispatch('COUNT_UP_BY', count);
    return count;
  }
}

export default new TestAction();

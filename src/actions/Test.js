import Frill from '../core';

class TestAction extends Frill.Action {

  constructor() {
    super();
    this.use('request', {prefix: '/api'});
    // this.use('socket', {url: 'http://localhost:3000'});
  }

  countUp(data) {
    this.request.prefix.get('/v1/hello', (err, ret) => console.log(ret.text));
    this.dispatch("COUNT_UP", data);
  }
}

export default new TestAction();

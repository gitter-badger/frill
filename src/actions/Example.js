import {Action} from 'frill-core';
import scrollData from '../helpers/testScrollItemsData';

class ExampleAction extends Action {

  constructor() {
    super();
    this.use('request', {prefix: '/api'});
    // this.use('socket', {url: 'http://localhost:3000'});
  }

  countUp() {
    this.dispatch('COUNT_UP');
  }

  countUpBy(count) {
    this.dispatch('COUNT_UP_BY', count);
    return count;
  }

  loadScrollItems(lastIndex, retrieve) {
    const data = scrollData.slice(lastIndex, lastIndex + retrieve);
    setTimeout(() => {
      this.dispatch('LOAD_SCROLL_ITEMS', {
        data: data,
        total: scrollData.length,
      });
    }, 1500);
  }
}

export default new ExampleAction();

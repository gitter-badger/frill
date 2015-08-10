import {BaseStore, attach} from 'frill-core';

const mockStoreEvent = (action, actionType, spy) => {
  const actions = { Action: action };
  class Checker extends BaseStore {
    constructor() {
      super();
      const listenTo = {};
      listenTo[actionType] = spy;
      this.actions = listenTo;
    }
  }
  const stores = { Checker: new Checker() };
  return attach(stores, actions);
};

export default {
  mockStoreEvent,
};

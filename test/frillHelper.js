import {BaseStore, BaseAction, attach} from 'frill-core';
// import Promise from 'bluebird';

const mockStoreEvent = (action, actionType, spy) => {
  const actions = { Action: action };
  class CheckStore extends BaseStore {
    constructor() {
      super();
      const listenTo = {};
      listenTo[actionType] = spy;
      this.actions = listenTo;
    }
  }
  const stores = { CheckStore: new CheckStore() };
  return attach(stores, actions);
};

const mockDispatch = (store, actionType, payload) => {
  const stores = { Store: store };
  class CheckAction extends BaseAction {
    constructor() {
      super();
    }

    fire(_actionType, _payload) {
      this.dispatch(_actionType, _payload);
    }
  }
  const actions = { CheckAction: new CheckAction() };
  attach(stores, actions);
  actions.CheckAction.fire(actionType, payload);
};


const inject = (options) => {
  return new Promise((resolve) => {
    server.inject(options, resolve);
  });
};

export default {
  inject,
  mockStoreEvent,
  mockDispatch,
};

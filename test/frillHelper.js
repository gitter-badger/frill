import {BaseStore, BaseAction, attach} from 'frill-core';

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

export default {
  mockStoreEvent,
  mockDispatch,
};

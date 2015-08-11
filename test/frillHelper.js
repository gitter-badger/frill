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

const inject = (options) => {
  return new Promise((resolve) => {
    server.inject(options, resolve);
  });
};

const mockSession = (server) => {
  global._sessionMock = {};
  const _mock = (request, reply) => {
    request.session = {};
    request.session.set = (key, val) => {
      _sessionMock[key] = val;
    };
    request.session.get = (key) => {
      return _sessionMock[key];
    };
    request.session.reset = () => {
      _sessionMock = {};
    };
    request.session.clear = (key) => {
      delete _sessionMock[key];
    };
    // simply set
    request.session.flash = request.session.set;

    reply.continue();
  };
  server.ext('onPreAuth', _mock);
};

const injectAuthenticated = (options) => {
  return inject({
    method: 'POST',
    url: '/api/v1/login',
    payload: {
      username: 'nanopx',
      password: 'hello',
    },
  }).then((response) => {
    response.result.token.should.exist;
    if (!options.headers) {
      options.headers = {};
    }
    options.headers.Authorization = response.result.token;
    return inject(options);
  });
};

export default {
  inject,
  mockStoreEvent,
  mockDispatch,
  mockSession,
  injectAuthenticated,
};

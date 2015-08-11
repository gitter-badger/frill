import {BaseStore, BaseAction, attach} from 'frill-core';

/**
 * Mock FrillCore.BaseStore
 */
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

/**
 * Mock FrillCore.BaseAction
 */
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

/**
 * Inject request to hapi
 */
const inject = (options) => {
  return new Promise((resolve) => {
    server.inject(options, resolve);
  });
};

/**
 * Mock session(Yar) and store them into global variables
 */
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

/**
 * Inject request to authenticated routes.
 *
 * Uses authentication endpoint '/api/v1/login',
 * and needs to be changed within your environment.
 * Sets the token to header `Authorization`.
 */
const injectAuthenticated = (options) => {
  return inject({
    method: 'POST',
    url: '/api/v1/login',
    payload: {
      username: 'nanopx',
      password: 'hello',
    },
  }).then((response) => {
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

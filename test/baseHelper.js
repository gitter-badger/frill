import {testUtil} from 'frill-core';

// get mockStoreEvent and mockDispatch from frillCore.testUtil
const {mockStoreEvent, mockDispatch} = testUtil;

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
const injectAuthenticated = (authOptions, options) => {
  return inject(authOptions).then((response) => {
    if (!options.headers) {
      options.headers = {};
    }
    options.headers.Authorization = response.result.token;
    return inject(options);
  });
};

/**
 * Create sinon.spy using sinon.sandbox
 */
const createSandboxSpy = (object, methods) => {
  const _spy = {};
  methods.map((method) => {
    _spy[method] = sandbox.spy(object, method);
  });
  return _spy;
};

const convertToPlainObject = (object) => {
  return new Promise((resolve) => {
    resolve(JSON.parse(JSON.stringify(object)));
  });
};


export default {
  inject,
  mockStoreEvent,
  mockDispatch,
  mockSession,
  injectAuthenticated,
  createSandboxSpy,
  convertToPlainObject,
};

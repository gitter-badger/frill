import Frill from './bootstrap';
import pack from '../package';
import api from './api';
import routes from './routes';
import Hapi from 'hapi';
import React from 'react';
import Router from 'react-router';
import Vision from 'vision';
import Inert from 'inert';
import Redis from 'catbox-redis';
import Session from 'yar';
import Authentication from 'bell';
import Jade from 'jade';
import good from 'good';
import goodConsole from 'good-console';
import swagger from 'hapi-swagger';
import _find from 'lodash/collection/find';
import _extend from 'lodash/object/extend';
import _isUndefined from 'lodash/lang/isUndefined';
import _argv from 'minimist';
import config from 'config';
let argv = _argv;
argv = _argv(process.argv.slice(2));

/**
 * Configure hapi.
 */
const SERVER_PORT = config.get('server.port');

const cacheConfig = config.util.cloneDeep(config.get('server.cache'));
cacheConfig.engine = Redis;

const server = new Hapi.Server({
  cache: [
    cacheConfig,
  ],
});
// console.log(server);
server.connection({port: SERVER_PORT});

/**
 * Configure hapi views
 */
server.register([
  Inert,
  Vision,
], (err) => {
  if (err) server.log(['error'], `view load error: ${err}`);
  server.views({
    engines: {
      jade: Jade,
    },
    relativeTo: __dirname,
    path: 'templates',
  });
});

/**
 * Configure sessions
 */
server.register({
  register: Session,
  options: config.get('server.session'),
}, (err) => {
  if (err) server.log(['error'], `session load error: ${err}`);
});

/**
 * Configure authentication strategies
 */
server.register([
  Authentication,
], (err) => {
  if (err) server.log(['error'], `authentication load error: ${err}`);
});

/**
 * Attempt to serve static files
 */
server.route({
  method: '*',
  path: '/{params*}',
  // don't use authentication strategy
  config: { auth: false },
  handler: (request, reply) => {
    if (request.path === '/') {
      return reply.continue();
    }
    reply.file('public' + request.path);
  },
});


/**
 * Mount all the APIs to hapi
 */
api(server);

/**
 * Configure hapi-swagger for API documentation.
 */
const swaggerOptions = {
  apiVersion: pack.version,
  basePath: config.get('server.swagger.path'),
};

server.register({
  register: swagger,
  options: swaggerOptions,
}, (err) => {
  if (err) server.log(['error'], `hapi-swagger load error: ${err}`);
});

/**
 * Catch requests to fire React Router
 */
// create context
const frillContext = Frill.attach(Frill._Stores, Frill._Actions);

server.ext('onPreResponse', (request, reply) => {
  const response = request.response;

  // if API request
  if (response.isBoom && request.path.substring(0, 5) === '/api/') {
    return reply.continue();
  }

  // if status code exists and request.path set to '/'
  if (!_isUndefined(request.response.statusCode) && request.path !== '/') {
    return reply.continue();
  }

  // fire React Router
  server.log(['info'], `Serving down to react-router with ${request.path}`);

  Router.run(routes(), request.path, (Handler, state) => {
    // find route from request.path
    const isFoundRoute = _find(state.routes, { path: request.path });

    // 200 if route found, else 404
    const _status = isFoundRoute ? 200 : 404;

    // create temporary output status
    let status = { statusCode: _status };

    // if response is an Error
    if (response.isBoom && response.output.statusCode !== 404) {
      status = response.output.payload;
    } else {
      if (_status === 200) {
        status.error = null;
        status.message = 'OK';
      } else if (_status === 404) {
        status.error = 'Not Found';
        status.message = 'Page not found.';
      }
    }

    // set status to state
    state.status = status;

    // set auth token if exists
    state.token = request.session.flash('token')[0];

    // pass down frill context to handler
    const patchedState = _extend({frill: frillContext}, state);

    // create handler
    const handler = React.createElement(Handler, patchedState);

    // construct markup
    const markup = React.renderToString(handler);

    server.log(['verbose'], markup);
    reply.view('default', {
      initialData: JSON.stringify(state),
      markup: markup,
    }).code(status.statusCode);
  });
});


/**
 * Configure good (for logging hapi)
 * TODO: disable at production
 */
// define which log level outputs which tags
const logLevels = {
  silent: {},
  error: {
    error: '*',
    log: ['error'],
    response: ['error'],
  },
  debug: {
    error: '*',
    log: ['debug', 'error'],
    response: ['debug', 'error'],
  },
  info: {
    error: '*',
    log: ['info', 'debug', 'error'],
    response: ['info', 'debug', 'error'],
  },
  verbose: {
    log: '*',
    ops: '*',
    error: '*',
    request: '*',
    response: '*',
  },
};

let logEvents;
if (argv.verbose) {
  logEvents = logLevels.verbose;
} else if (argv.info) {
  logEvents = logLevels.info;
} else if (argv.debug) {
  logEvents = logLevels.debug;
} else if (argv.error) {
  logEvents = logLevels.error;
} else if (argv.silent) {
  logEvents = logLevels.silent;
} else {
  const configLogLevel = config.get('server.logging.level');
  if (configLogLevel) {
    logEvents = logLevels[configLogLevel] || logLevels.info;
  } else {
    logEvents = logLevels.info;
  }
}

const goodOptions = {
  reporters: [{
    reporter: goodConsole,
    events: logEvents,
    config: config.get('server.logging.options'),
  }],
};

server.register({
  register: good,
  options: goodOptions,
}, (err) => {
  if (err) {
    console.error(err);
  } else {
    // initialize server
    server.start(() => {
      server.log(['info'], `Server started at ${server.info.uri}`);
    });
  }
});

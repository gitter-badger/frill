global.__SERVER__ = true;

import Frill from './bootstrap';
import pack from '../package';
import apiPlugin from './api';
import routes from './routes';
import Hapi from 'hapi';
import React from 'react';
import Router from 'react-router';
import Redis from 'catbox-redis';
import Jade from 'jade';
import good from 'good';
import goodConsole from 'good-console';
import swagger from 'hapi-swagger';
import _extend from 'lodash/object/extend';
import _isUndefined from 'lodash/lang/isUndefined';
import _argv from 'minimist';
let argv = _argv;
argv = _argv(process.argv.slice(2));

/**
 * Configure hapi.
 */
const SERVER_PORT = 3000;
const server = new Hapi.Server({
  cache: [{
    name: 'redis',
    engine: Redis,
    host: '127.0.0.1',
    // partition: 'cache',
  }],
});
server.connection({port: SERVER_PORT});

/**
 * Configure hapi views
 */
server.views({
  engines: {
    jade: Jade,
  },
  relativeTo: __dirname,
  path: 'templates',
});

/**
 * Attempt to serve static files
 */
server.route({
  method: '*',
  path: '/{params*}',
  handler: (request, reply) => {
    reply.file('public' + request.path);
  },
});

/**
 * Mount all the APIs to hapi
 */
server.register({
  register: apiPlugin,
}, {
  routes: {
    prefix: '/api',
  },
}, (err) => {
  if (err) server.log(['error'], `API plugin load error: ${err}`);
});

/**
 * Configure hapi-swagger for API documentation.
 */
const swaggerOptions = {
  apiVersion: pack.version,
  basePath: 'http://localhost:3001',
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
  if (!_isUndefined(request.response.statusCode)) {
    return reply.continue();
  }
  // fire React Router
  server.log(['info'], `Serving down to react-router with ${request.path}`);
  Router.run(routes(), request.path, (Handler, state) => {
    // pass down frill context to handler
    const patchedState = _extend({frill: frillContext}, state);
    const handler = React.createElement(Handler, patchedState);
    const markup = React.renderToString(handler);
    server.log(['verbose'], markup);
    reply.view('default', {
      initialData: JSON.stringify(state),
      markup: markup,
    });
  });
});

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
  logEvents = logLevels.info;
}

/**
 * Configure good (for logging hapi)
 */
const goodOptions = {
  reporters: [{
    reporter: goodConsole,
    events: logEvents,
    config: {
      format: '[[]HH:mm:ss[]][[frill]]',
      utc: false,
    },
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

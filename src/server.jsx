import Frill from './bootstrap';
import {join as pathJoin} from 'path';
import pack from '../package';
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
import apiPlugin from './api';
import routes from './routes';


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
  }]
});
server.connection({port: SERVER_PORT});

/**
 * Configure hapi views
 */
server.views({
  engines: {
    jade: Jade
  },
  path: pathJoin(__dirname, 'templates'),
});

/**
 * Attempt to serve static files
 */
server.route({
	method:  '*',
	path:    '/{params*}',
	handler: (request, reply) => {
		reply.file('static' + request.path);
	}
});

/**
 * Mount all the APIs to hapi
 */
server.register({
  register: apiPlugin,
}, {
  routes: {
    prefix: '/api',
  }
}, (err) => {
  if (err) console.error(`API plugin load error: ${err}`);
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
    server.log(['debug'], markup);
    reply.view('index', {
      initialData: JSON.stringify(state),
      markup: markup
    });
  });
});

/**
 * Configure hapi-swagger for API documentation.
 */
const swaggerOptions = {
  apiVersion: pack.version
};

server.register({
  register: swagger,
  options: swaggerOptions
}, (err) => {
  if (err) console.error(`hapi-swagger load error: ${err}`);

});

/**
 * Configure good (for logging hapi)
 */
const goodOptions = {
  reporters: [{
      reporter: goodConsole,
      events: {
        log: '*',
        response: '*',
      }
  }],
};

server.register({
  register: good,
  options: goodOptions
}, (err) => {
  if (err) {
    console.error(err);
  } else {
    // initialize server
    server.start(() => console.info(`Server started at ${server.info.uri}`));
  }
});

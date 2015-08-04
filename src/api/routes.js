import Auth from './auth';
import apiV1 from './v1';

export default (server) => {
  return [{
    '/api': {
      '/v1': [{
        method: ['GET', 'POST'], path: '/hello',
        config: apiV1.hello(server),
      }, {
        method: ['GET', 'POST'], path: '/hellotwo',
        config: apiV1.hello(server),
      }],
    },
    '/auth': [{
      method: ['GET', 'POST'], path: '/logout',
      config: apiV1.hello(server),
    }, {
      '/twitter': [{
        method: ['GET', 'POST'], path: '/login',
        config: Auth.twitter(server),
      }],
    }],
  }];
};

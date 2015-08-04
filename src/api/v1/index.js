import hello from './hello';
export default (server, {helpers, models}, next) => {
  const apiV1 = {
    register: (_server, options, _next) => {
      _server.route(hello(server, {helpers, models}));
      _next();
    },
  };

  apiV1.register.attributes = {
    name: 'v1',
    version: '0.0.0',
  };

  server.register({
    register: apiV1,
  }, {
    routes: {
      prefix: '/v1',
    },
  }, next);
};

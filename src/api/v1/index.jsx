import Hello from './hello';
export default (server, helpers, next) => {

  const v1 = {
    register: (server, options, next) => {
      server.route(Hello(helpers));
      next();
    },
  };

  v1.register.attributes = {
    name: 'v1',
    version: '0.0.0',
  };

  server.register({
    register: v1,
  }, {
    routes: {
      prefix: '/v1',
    }
  }, next);
}

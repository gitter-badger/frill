import routes from './routes';

const api = (server) => {
  const {apiRoutes, authRoutes} = routes(server);

  console.log(apiRoutes);
  // Authentication
  server.route(authRoutes);
  // APIs
  server.route(apiRoutes);


  // server.register([
  //   apiPlugin,
  // ], {
  //   routes: {prefix: '/api'},
  // }, (err) => {
  //   if (err) server.log(['error'], `routes: api load error: ${err}`);
  // });
};

export default api;

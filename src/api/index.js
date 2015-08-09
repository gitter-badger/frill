import routes from './routes';

/**
 * Mount routes
 */
const api = (server) => {
  server.route(routes(server));
};

export default api;

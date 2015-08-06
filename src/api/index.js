import routes from './routes';

const api = (server) => {
  server.route(routes(server));
};

export default api;

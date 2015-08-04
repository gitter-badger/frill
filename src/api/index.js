import routes from './routes';
import {each as _each} from 'lodash';
// const apiPlugin = {
//   register: (server, options, next) => {
//     // Mount api versions here.
//     apiV1(server, {helpers, models}, next);
//   },
// };
// apiPlugin.register.attributes = {
//   name: 'api',
//   version: '1.0.0',
// };

const prefixLoop = (apiRoutes) => {
  const prefixedRoutes = [];
  const loop = (_routes, _prefixed) => {
    _each(_routes, (route, prefix) => {
      let _prefix = _prefixed;
      if (typeof prefix === 'string') {
        _prefix = !_prefixed ? prefix : _prefixed + prefix;
      }
      if (route.config) {
        route.path = _prefix + route.path;
        prefixedRoutes.push(route);
      } else {
        loop(route, _prefix);
      }
    });
  };
  loop(apiRoutes);
  return prefixedRoutes;
};

const api = (server) => {
  const apiRoutes = routes(server);
  server.route(prefixLoop(apiRoutes));

  // Authentication
  // server.register([
  //   bell,
  //   auth(server, {helpers, models}),
  // ], {
  //   routes: {prefix: '/auth'},
  // }, (err) => {
  //   if (err) server.log(['error'], `authentication load error: ${err}`);
  // });

  // APIs
  // server.register([
  //   apiPlugin,
  // ], {
  //   routes: {prefix: '/api'},
  // }, (err) => {
  //   if (err) server.log(['error'], `api load error: ${err}`);
  // });
};

export default api;

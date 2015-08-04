import routes from './routes';
// import {each as _each} from 'lodash';
// const prefixLoop = (apiRoutes) => {
//   const prefixedRoutes = [];
//   const loop = (_routes, _prefixed) => {
//     _each(_routes, (route, prefix) => {
//       let _prefix = _prefixed;
//       if (typeof prefix === 'string') {
//         _prefix = !_prefixed ? prefix : _prefixed + prefix;
//       }
//       if (route.config) {
//         route.path = _prefix + route.path;
//         prefixedRoutes.push(route);
//       } else {
//         loop(route, _prefix);
//       }
//     });
//   };
//   loop(apiRoutes);
//   return prefixedRoutes;
// };


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

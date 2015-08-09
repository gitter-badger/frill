import auth from './auth';
import apiV1 from './v1';
import {routePrefixer} from '../helpers';

/**
 * Mount all routes to use
 */
const routes = (server) => {
  // Authentication routes
  const authRoutes = auth(server);

  // API routes
  const apiRoutes = [
    ...routePrefixer('/api', apiV1(server)),
  ];

  // Stack up routes
  return [
    ...authRoutes,
    ...apiRoutes,
  ];
};

export default routes;

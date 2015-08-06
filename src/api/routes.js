import auth from './auth';
import apiV1 from './v1';
import {routePrefixer} from '../helpers';

export default (server) => {
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

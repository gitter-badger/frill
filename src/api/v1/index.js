import localAuth from './localAuth';
import hello from './hello';
import {routePrefixer} from '../../helpers';

/**
 * Mount all api v1 routes
 */
const apiV1 = (server) => {
  return routePrefixer('/v1', [
    ...localAuth,
    ...hello(server),
  ]);
};

export default apiV1;

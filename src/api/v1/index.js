import {routePrefixer} from '../../helpers';
import Models from '../../models';
import hello from './hello';
import posts from './posts';

/**
 * Mount all api v1 routes
 */
const apiV1 = (server) => {
  return routePrefixer('/v1', [
    ...hello(server, Models),
    ...posts(server, Models),
  ]);
};

export default apiV1;
